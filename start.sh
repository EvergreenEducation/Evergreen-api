#!/bin/sh
./node_modules/.bin/sequelize db:migrate --url $DATABASE_URL
yarn run compile
node dist/index.js
