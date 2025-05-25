// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('../config/db');
const Transaction = require('../models/transaction');
const transactionRoutes = require('../routes/transactionRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// DB Sync and Server Start
sequelize.sync({ alter: true }) // auto creates tables and columns if missing
  .then(() => {
    console.log('MySQL connected and synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB Connection Error:', err));



// const isDev = process.env.DEV_MODE === 'true';

// if (!isDev) {
//   sequelize.sync({ alter: true })
//     .then(() => {
//       console.log('MySQL connected and synced');
//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch(err => console.error('DB Connection Error:', err));
// } else {
//   console.log('🟡 DEV_MODE active: Skipping DB connection and using in-memory store');
//   app.listen(PORT, () => console.log(`Server running in DEV_MODE on port ${PORT}`));
// }
