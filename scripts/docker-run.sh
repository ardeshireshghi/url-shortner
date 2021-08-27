#!/usr/bin/env bash

set -e

docker compose build --build-arg GITLAB_TOKEN="$GITLAB_TOKEN"
docker compose up --force-recreate