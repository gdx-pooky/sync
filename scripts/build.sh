#!/bin/sh
npm install
npm run build
pm2 start pm2-production.json