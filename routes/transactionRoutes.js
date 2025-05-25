const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Create new transaction
// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, datetime } = req.body;

    const newTransaction = await Transaction.create({ title, amount, type, datetime });

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error saving transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.findAll({ order: [['createdAt', 'DESC']] });
  res.json(transactions);
});

// Delete transaction
router.delete('/:id', async (req, res) => {
  await Transaction.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Transaction deleted' });
});

// Update a transaction
router.put('/:id', async (req, res) => {
  console.log('PUT body:', req.body); // <-- add this

  try {
    const { title, amount, type, datetime } = req.body;
    const transactionId = req.params.id;

    const [updatedCount] = await Transaction.update(
      { title, amount, type, datetime },
      { where: { id: transactionId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const updatedTransaction = await Transaction.findByPk(transactionId);
    res.json(updatedTransaction);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// disconnecting DB

// const isDev = process.env.DEV_MODE === 'true';
// // / 🔸 Store dynamic user data in memory (cleared when server restarts)
// let tempTransactions = [];

// router.get('/', async (req, res) => {
//   if (isDev) {
//     return res.json(tempTransactions);
//   }

//   try {
//     const transactions = await Transaction.findAll();
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: 'DB error: ' + err.message });
//   }
// });

// router.post('/', async (req, res) => {

//   if (isDev) {
//     const newTx = {
//       id: Date.now(),
//       ...req.body
//     };
//     tempTransactions.push(newTx);
//     return res.status(201).json(newTx);
//   }

//   try {
//     const transaction = await Transaction.create(req.body);
//     res.status(201).json(transaction);
//   } catch (err) {
//     res.status(500).json({ error: 'DB error: ' + err.message });
//   }
// });

// disconnecting DB end




module.exports = router;
