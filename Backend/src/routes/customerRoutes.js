const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerControllers');

// Create a new customer
router.post('/add', customerController.createCustomer);

// Get all customers
router.get('/getAll', customerController.getAllCustomers);

// Get a customer by ID
router.get('/get/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/update/:id', customerController.updateCustomerById);

// Delete a customer by ID
router.delete('/delete/:id', customerController.deleteCustomerById);

module.exports = router;
