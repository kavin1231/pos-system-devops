const express=require('express');
const router = express.Router();

const CustomerController = require('../controller/CustomerController');
const middleware = require('../middleware/Middleware');

router.post('/create',middleware, CustomerController.createCustomer);
router.post('/update/:id', CustomerController.updateCustomer);
router.post('/delete/:id', CustomerController.deleteCustomer);
router.post('/find-by-id/:id', CustomerController.findCustomerById);
router.post('/load-all', CustomerController.loadAllCustomers);

module.exports= router;