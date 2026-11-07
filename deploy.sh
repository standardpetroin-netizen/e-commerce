#!/usr/bin/env bash
# Build the Vite client and publish the build to the `deploy` branch.
# Point Hostinger hPanel -> Advanced -> GIT at branch `deploy`, path public_html.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> installing and building client"
cd "$ROOT/client"
npm ci --no-audit --no-fund
npm run build

echo "==> publishing client/dist to branch 'deploy'"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT
cp -a "$ROOT/client/dist/." "$OUT/"
cd "$OUT"
git init -q -b deploy
git add -A
git -c user.name="standardpetroin-netizen" \
    -c user.email="standardpetroin-netizen@users.noreply.github.com" \
    commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push --force "$(git -C "$ROOT" remote get-url origin)" HEAD:deploy
echo "==> done: build published to origin/deploy"
