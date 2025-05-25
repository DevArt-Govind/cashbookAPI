const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // replaced ENUM
  datetime: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true
});

module.exports = Transaction;