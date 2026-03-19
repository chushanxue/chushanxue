#!/bin/sh

set -eu

# 一次搞定
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

COMMIT_MESSAGE=${*:-AI重构}

git config --global https.proxy 127.0.0.1:7891
git config --global http.proxy 127.0.0.1:7891
pnpm build:pre
git add .
git commit -m "$COMMIT_MESSAGE" --no-verify
git push origin HEAD
# git config --global --unset http.proxy  
# git config --global --unset https.proxy  


