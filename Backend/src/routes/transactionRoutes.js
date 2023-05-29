const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionControllers');

router.post('/create', transactionController.createTransaction);

router.put('/git', transactionController.getTransactions);

module.exports = router;
