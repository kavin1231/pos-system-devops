const express = require('express');
const router =express.Router();

const ProductController = require('../controller/ProductController');
const middleware = require('../middleware/Middleware');


// Create a new customer
router.post('/create', ProductController.createProduct);

// Update a customer by ID
router.put('/update/:id', ProductController.updateProduct);

// Delete a customer by ID
router.delete('/delete/:id', ProductController.deleteProduct);

// Find a customer by ID
router.get('/find-by-id/:id', ProductController.findProductById);

// Load all customers
router.get('/load-all', ProductController.loadAllProducts);

module.exports= router;