#!/usr/bin/env bash
# ==============================================================================
# 🛑 ZERO-COST TEARDOWN SCRIPT FOR KOOMAI WEB APPLICATION
# Cleanly terminates Next.js processes and frees port 3000
# ==============================================================================

set -eo pipefail

BOLD='\033[1m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

PORT="${PORT:-3000}"

echo -e "${YELLOW}${BOLD}[*] Teardown: Stopping KoomAI Web Platform...${NC}"

# Kill process on port 3000
if command -v lsof &>/dev/null; then
    PIDS=$(lsof -ti ":${PORT}" 2>/dev/null || true)
    if [ -n "$PIDS" ]; then
        echo -e "  ${RED}✖${NC} Terminating process on port ${PORT} (PID: ${PIDS})..."
        kill -9 $PIDS 2>/dev/null || true
    fi
fi

# Kill any lingering next dev or next-server
pkill -f "next.*dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

echo -e "\n${GREEN}${BOLD}🎉 KoomAI Web Platform terminated cleanly. Port ${PORT} is free! ($0.00 footprint)${NC}\n"
