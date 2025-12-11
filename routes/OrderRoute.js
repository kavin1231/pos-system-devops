const express = require('express');
const router =express.Router();

const OrderController = require('../controller/OrderController');
const middleware = require('../middleware/Middleware');


// Create a new customer
router.post('/create', OrderController.createOrder);

// Load all customers
router.get('/find-all', OrderController.findAllOrders);

module.exports= router;