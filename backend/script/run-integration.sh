#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker compose --file test.docker-compose.yml up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
jest --watch