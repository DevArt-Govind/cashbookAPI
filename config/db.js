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


// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

// db disconnection
// if (process.env.DEV_MODE !== 'true') {
//   testConnection();
// } else {
//   console.log('🟡 DEV_MODE: Skipping testConnection');
// }
testConnection();