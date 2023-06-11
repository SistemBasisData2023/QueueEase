const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const customerController = require('../controllers/customerControllers');


module.exports = function (io) {
    router.post('/add', (req, res) => {
        customerController.createCustomer(req, res, io);
    });
    
    router.get('/getAll',customerController.getAllCustomers);
    
    router.get('/get/:id', customerController.getCustomerById);
    
    router.put('/update/:id', customerController.updateCustomerById);
    
    router.delete('/delete/:id', customerController.deleteCustomerById);
    
    router.get('/getByQueue/:id', customerController.getCustomerByQueueId);
    
    return router;
}

