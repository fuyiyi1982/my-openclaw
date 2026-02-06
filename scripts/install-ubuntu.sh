#!/usr/bin/env bash

set -euo pipefail

log() {
  printf "\n[openclaw] %s\n" "$*"
}

die() {
  printf "\n[openclaw] ERROR: %s\n" "$*" >&2
  exit 1
}

warn() {
  printf "\n[openclaw] WARN: %s\n" "$*" >&2
}

if [ "$(id -u)" -eq 0 ] && [ "${OPENCLAW_INSTALL_ALLOW_ROOT:-}" != "1" ]; then
  die "Run this script as a normal user with sudo. To override, set OPENCLAW_INSTALL_ALLOW_ROOT=1."
fi

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT=$(cd "$SCRIPT_DIR/.." && pwd)

if [ ! -f "$REPO_ROOT/package.json" ] || [ ! -f "$REPO_ROOT/pnpm-workspace.yaml" ]; then
  die "This script must run from an OpenClaw repo checkout."
fi

if [ -f /etc/os-release ]; then
  # shellcheck disable=SC1091
  . /etc/os-release
  if [ "${ID:-}" != "ubuntu" ]; then
    warn "Detected ${ID:-unknown}; this script is intended for Ubuntu."
  fi
else
  warn "Unable to detect OS via /etc/os-release."
fi

need_sudo=true
if [ "$(id -u)" -eq 0 ]; then
  need_sudo=false
fi

run_sudo() {
  if [ "$need_sudo" = true ]; then
    sudo "$@"
  else
    "$@"
  fi
}

ensure_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    return 1
  fi
  return 0
}

log "Checking base dependencies"
if ! ensure_cmd curl || ! ensure_cmd git; then
  run_sudo apt-get update -y
  run_sudo apt-get install -y curl git ca-certificates
fi

log "Installing build dependencies"
run_sudo apt-get update -y
run_sudo apt-get install -y build-essential python3 pkg-config

install_node=false
if ensure_cmd node; then
  node_major=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo "0")
  if [ "$node_major" -lt 22 ]; then
    install_node=true
  fi
else
  install_node=true
fi

if [ "$install_node" = true ]; then
  log "Installing Node.js 22 via NodeSource"
  curl -fsSL https://deb.nodesource.com/setup_22.x | run_sudo -E bash -
  run_sudo apt-get install -y nodejs
fi

if ! ensure_cmd corepack; then
  die "corepack not found. Ensure Node 22+ is installed."
fi

log "Enabling pnpm via corepack"
corepack enable
corepack prepare pnpm@latest --activate

export SHARP_IGNORE_GLOBAL_LIBVIPS="${SHARP_IGNORE_GLOBAL_LIBVIPS:-1}"

log "Installing dependencies"
cd "$REPO_ROOT"
pnpm install

log "Building UI"
pnpm ui:build

log "Building OpenClaw"
pnpm build

log "Configuring gateway"
pnpm openclaw config set gateway.mode local

log "Installing gateway service (systemd user)"
pnpm openclaw gateway install --runtime node --force

if ensure_cmd loginctl; then
  install_user="${SUDO_USER:-$USER}"
  if [ -n "$install_user" ]; then
    run_sudo loginctl enable-linger "$install_user" || true
  fi
fi

log "Starting gateway service"
pnpm openclaw gateway start

log "Done. Next steps:"
log "- Run: pnpm openclaw onboard"
log "- Check: pnpm openclaw gateway status"
