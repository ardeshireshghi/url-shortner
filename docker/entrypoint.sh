#!/usr/bin/env bash

if [[ "$1" =~ "sh" ]] || [[ "$1" =~ "bash" ]]; then
  :
else
  set -- node ./dist/main.js "$@"
fi

exec "$@"

