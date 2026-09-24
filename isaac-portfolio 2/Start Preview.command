#!/bin/zsh
cd "${0:A:h}"
RUNTIME='/Users/isaaccallender-barlow/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3'
if [[ -x "$RUNTIME" ]]; then
  "$RUNTIME" -m http.server 4173 --bind 127.0.0.1 --directory dist
else
  python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
fi
