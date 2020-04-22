#!/bin/sh
echo "======= Seeding DataFields ======"
./node_modules/.bin/sequelize db:seed --seed "20200419030741-seed-datafields.js"
