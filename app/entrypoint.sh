#!/bin/sh

npm install
npm run build
mkdir -p /app/frontend/
cp -r /app/build/. /app/frontend/.
chmod -R 755 /app/frontend
