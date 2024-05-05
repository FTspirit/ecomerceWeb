/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
const config = require('../config/config');

// Postgres config
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const Sequelize = require('sequelize');

const sequelizeGofaProduct = new Sequelize(
  config.db.postgresUSER.db,
  config.db.postgresUSER.userName,
  config.db.postgresUSER.password,
  {
    host: config.db.postgresUSER.host,
    port: config.db.postgresUSER.port,
    dialect: config.db.postgresUSER.dialect,
    define: {
      dialectOptions: {
        ssl: true,
      },
      underscored: true,
      timestamps: false,
    },
  }
);

const db = {};

fs.readdirSync(`${__dirname}/moon/product`)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line global-require, security/detect-non-literal-require, import/no-dynamic-require
    const model = require(path.join(`${__dirname}/moon/product`, file))(sequelizeGofaProduct, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelizeGofaProduct = sequelizeGofaProduct;

module.exports = db;
