#!/bin/bash
set -euo pipefail

# AanbouwPlatform / Prefab Select — SessionStart hook.
# Installs dependencies so lint (tsc) and build (vite) work out of the box in
# Claude Code on the web sessions. Idempotent and non-interactive.

# Only run in remote (Claude Code on the web) sessions; local already has deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# npm install (not ci) so the cached container layer is reused across sessions.
npm install --no-audit --no-fund
