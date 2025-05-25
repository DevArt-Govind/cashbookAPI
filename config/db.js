const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,      // e.g. 'financedb_transactions'
  process.env.DB_USER,      // e.g. 'financedb'
  process.env.DB_PASSWORD,  // your DB password from AlwaysData
  {
    host: process.env.DB_HOST, // 'mysql-financedb.alwaysdata.net'
    dialect: 'mysql',
    port: 3306,
    logging: false, // optional, disable SQL logging in console
  }
);

module.exports = sequelize;
