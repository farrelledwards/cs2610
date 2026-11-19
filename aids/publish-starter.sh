#!/usr/bin/env bash
#
# Sync react-express-starter-app/ into the standalone GitHub template repo
# that students use ("Use this template").
#
# One-time setup:
#   1. Create an empty repo on GitHub (e.g. cs2610-starter-app).
#   2. git clone it somewhere outside this course repo.
#   3. On GitHub: Settings -> General -> check "Template repository".
#
# Usage: ./publish-starter.sh <path-to-local-clone-of-template-repo>
#
# Commits locally; prints the push command rather than pushing.

set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)/react-express-starter-app"
DEST="${1:-}"

if [[ -z "$DEST" ]]; then
  echo "Usage: $0 <path-to-local-clone-of-template-repo>" >&2
  exit 1
fi
if [[ ! -d "$DEST/.git" ]]; then
  echo "Error: '$DEST' is not the root of a git repo. Clone the template repo there first." >&2
  exit 1
fi
DEST="$(cd "$DEST" && pwd)"
case "$DEST/" in
  "$SRC"/*|"$(git -C "$SRC" rev-parse --show-toplevel)"/*)
    echo "Error: destination must be outside the course repo." >&2
    exit 1 ;;
esac

echo "==> Syncing $SRC -> $DEST"
rsync -a --delete \
  --exclude .git \
  --exclude node_modules \
  --exclude .env \
  --exclude client/dist \
  --exclude .DS_Store \
  "$SRC/" "$DEST/"

cd "$DEST"
git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi
git commit -m "Sync from course repo ($(git -C "$SRC" rev-parse --short HEAD))"
echo
echo "Committed. Review, then push with:"
echo "  git -C \"$DEST\" push"
