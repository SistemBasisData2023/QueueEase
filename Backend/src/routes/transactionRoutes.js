const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionControllers');

module.exports = function (io){
    router.post('/create', (req, res) => {
        transactionController.createTransaction(req, res, io);
      }
     );
    
    router.get('/get', transactionController.getTransactions);
    
    return router;
};

