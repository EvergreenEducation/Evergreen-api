#!/bin/sh
echo "======= Migration ======"
./node_modules/.bin/sequelize db:migrate --url $DATABASE_URL

echo "======= Start App ======"
node dist/index.js
