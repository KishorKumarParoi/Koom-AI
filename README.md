# 🌐 KoomAI — Enterprise Video Platform & Cockpit

[![Next.js](https://img.shields.io/badge/Next.js-v15.3%2B-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-v19.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-v6.10-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Billing-008CDD?logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> Full-stack Next.js enterprise video recording and sharing platform. Features multi-tenant workspaces, AI-generated speech transcriptions and summaries, dynamic video waveform scrubbing, CloudFront edge delivery, and Stripe subscription monetization.

---

## ⚡ Quickstart Runbooks

### 1. Launch in Development Mode (Port 3000)
```bash
./deploy.sh
```

### 2. Launch in Background Daemon Mode
```bash
./deploy.sh --daemon
```

### 3. Build & Run Production Bundle
```bash
./deploy.sh --prod
```

### 4. Zero-Cost Instant Teardown
```bash
./clear.sh
```

---

## 🚪 Key Platform Routes

| Route | Purpose |
| :--- | :--- |
| `http://localhost:3000/` | Public Landing Page & Features Showcase |
| `http://localhost:3000/dashboard` | Main User Cockpit (Videos, Folders, Team Workspaces) |
| `http://localhost:3000/auth/sign-in` | Clerk Enterprise Authentication & SSO |
| `http://localhost:3000/api/health` | System & Database Health Check Probe |
| `http://localhost:3000/api/recording/:id/processing` | Webhook: Initializes video processing stage |
| `http://localhost:3000/api/recording/:id/transcribe` | Webhook: Receives Whisper AI transcript and GPT summary |
| `http://localhost:3000/api/recording/:id/complete` | Webhook: Marks video ready for user playback |

---

## 🔧 Environment Variables (`.env`)

```ini
NEXT_PUBLIC_URL=http://localhost:3000
DATABASE_URL="postgresql://user:password@neon.tech/Koom?sslmode=require"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SUBSCRIPTION_PRICE_ID="price_..."
NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL="https://d1350iy0inho7b.cloudfront.net"
```

---

## 🏛️ Architecture & System Design
For complete architectural diagrams, ERDs, and trade-off analyses, read [ARCHITECTURE.md](file:///Users/kishorkumarparoi/job-project/koom-ai/ARCHITECTURE.md).
