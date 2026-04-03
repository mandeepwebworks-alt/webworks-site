#!/bin/bash
set -e

BASE="/Users/mandeep/Downloads/Projects/WebWorks"
cd "$BASE"

NODE_BIN="$(command -v node || true)"
if [ -z "$NODE_BIN" ]; then
  echo "Node.js was not found on PATH."
  exit 1
fi

exec "$NODE_BIN" ./node_modules/astro/astro.js build
