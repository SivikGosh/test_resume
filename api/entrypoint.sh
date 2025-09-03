#!/bin/sh

set -e

echo "Waiting for DB load"
sleep 30

echo "Migrations"
alembic upgrade head

echo "Start service"
exec gunicorn -k uvicorn.workers.UvicornWorker \
     --worker-tmp-dir /dev/shm src.main:app --bind=0.0.0.0:8000
