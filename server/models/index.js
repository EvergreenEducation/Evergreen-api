import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import env from '@/common/env';

const basename = path.basename(__filename);

const sequelizeOptions = {
  logging: false,
  define: {
    underscored: true,
    syncOnAssociation: false,
    timestamps: true,
    paranoid: true,
  },
  pool: {
    maxConnections: 50,
    minConnections: 0,
    maxIdleTime: 30000,
  },
  benchmark: true,
  dialect: 'postgres',
};

// res.header('Access-Control-Allow-Origin', '*');
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// res.header('Access-Control-Allow-Headers', 'Content-Type');
console.log("------------db------------")
const sequelize = new Sequelize(env.DATABASE_URL, sequelizeOptions);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeInstance = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
