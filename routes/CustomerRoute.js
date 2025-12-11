const express = require('express');
const router =express.Router();

const CustomerController = require('../controller/CustomerController');
const middleware = require('../middleware/Middleware');


// Create a new customer
router.post('/create', CustomerController.createCustomer);

// Update a customer by ID
router.put('/update/:id', CustomerController.updateCustomer);

// Delete a customer by ID
router.delete('/delete/:id', CustomerController.deleteCustomer);

// Find a customer by ID
router.get('/find-by-id/:id', CustomerController.findCustomerById);

// Load all customers
router.get('/load-all', CustomerController.loadAllCustomers);

module.exports= router;