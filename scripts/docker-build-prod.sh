#!/bin/sh
set -e

cd "$(dirname "$0")/.."

export DOCKER_BUILDKIT=1
export COMPOSE_PARALLEL_LIMIT=1

docker compose -f compose.prod.yml build --progress=plain "$@"
