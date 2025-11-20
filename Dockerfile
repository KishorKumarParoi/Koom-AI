# Multi-stage production container for KoomAI Next.js 15+ Web Platform
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package.json bun.lock* ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile || bun install

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL:-"postgresql://placeholder:placeholder@localhost:5432/placeholder"}
RUN bunx prisma generate

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_aW1tb3J0YWwtY2F0LTUzLmNsZXJrLmFjY291bnRzLmRldiQ"
RUN bun run build

# Production Runner
FROM oven/bun:1.2-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache curl

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

USER bun
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["bun", "run", "start"]
