const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionControllers');

router.post('/create', transactionController.createTransaction);

router.get('/get', transactionController.getTransactions);

module.exports = router;
