#!/usr/bin/env bash
# ==============================================================================
# 🌐 KOOMAI NEXT.JS WEB COCKPIT & VIDEO PLATFORM DEPLOYMENT SCRIPT
# One-click automated runner for Next.js 15+ App Router, Prisma & PostgreSQL
# ==============================================================================

set -eo pipefail

BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${PORT:-3000}"

echo -e "${CYAN}${BOLD}"
cat << "EOF"
================================================================================
  🌐 KOOMAI NEXT.JS 15+ ENTERPRISE VIDEO PLATFORM & COCKPIT
  Automated Runner & Environment Orchestrator
================================================================================
EOF
echo -e "${NC}"

# 1. Kill any existing process on port 3000
if command -v lsof &>/dev/null; then
    OCCUPIED_PID=$(lsof -ti ":${PORT}" 2>/dev/null || true)
    if [ -n "$OCCUPIED_PID" ]; then
        echo -e "${YELLOW}[i] Port ${PORT} occupied by PID ${OCCUPIED_PID}. Terminating...${NC}"
        kill -9 $OCCUPIED_PID 2>/dev/null || true
        sleep 1
    fi
fi

# 2. Package Manager
if command -v bun &>/dev/null; then
    PKG_MGR="bun"
elif command -v npm &>/dev/null; then
    PKG_MGR="npm"
else
    echo -e "${RED}[ERROR] Neither bun nor npm found.${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] Using package runtime: ${PKG_MGR}${NC}"

# 3. Ensure Dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[+] Installing web platform dependencies...${NC}"
    $PKG_MGR install
fi

# 4. Generate Prisma Client
echo -e "${CYAN}[*] Generating Prisma ORM Client...${NC}"
if [ "$PKG_MGR" = "bun" ]; then
    bunx prisma generate 2>/dev/null || npx prisma generate
else
    npx prisma generate
fi
echo -e "${GREEN}[✓] Prisma client ready.${NC}"

# 5. Check Media Ingestion Backend (:5001)
if curl -s -m 1 http://localhost:5001/health >/dev/null 2>&1; then
    echo -e "${GREEN}[✓] KoomAI Media Ingestion Backend is active at http://localhost:5001${NC}"
else
    echo -e "${YELLOW}[!] Warning: Media Backend (:5001) not running. Launch via: cd ../koom-ai-express && ./deploy.sh --daemon${NC}"
fi

# 6. Launch Server
echo -e "\n${GREEN}${BOLD}[*] Launching KoomAI Web Cockpit on http://localhost:${PORT}...${NC}"

if [ "$1" = "--prod" ] || [ "$1" = "-p" ]; then
    echo -e "${CYAN}[*] Building production Next.js standalone bundle...${NC}"
    $PKG_MGR run build
    exec $PKG_MGR run start -- -p "${PORT}"
elif [ "$1" = "--daemon" ] || [ "$1" = "-d" ]; then
    mkdir -p logs
    nohup $PKG_MGR run dev -- -p "${PORT}" > logs/web.log 2>&1 &
    APP_PID=$!
    echo -e "${GREEN}[✓] KoomAI Web running in background (PID: ${APP_PID})${NC}"
    echo -e "  • Beast Cockpit: ${CYAN}http://localhost:${PORT}/beast${NC}"
    echo -e "  • Web Home:      ${CYAN}http://localhost:${PORT}${NC}"
    echo -e "  • Dashboard:     ${CYAN}http://localhost:${PORT}/dashboard${NC}"
    echo -e "  • Health:        ${CYAN}http://localhost:${PORT}/api/health${NC}"
    echo -e "  • Logs:          ${YELLOW}tail -f logs/web.log${NC}"
else
    echo -e "  • Beast Cockpit: ${CYAN}http://localhost:${PORT}/beast${NC}"
    exec $PKG_MGR run dev -- -p "${PORT}"
fi
