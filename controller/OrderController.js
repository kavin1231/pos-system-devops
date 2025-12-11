const Order = require('../model/OrderSchema');

// CREATE ORDER
const createOrder = async (req, resp) => {
    try {
        const { date, totalCost, products, customer } = req.body;

        // Validate input
        if (!date || !totalCost || !products || !customer) {
            return resp.status(400).json({ message: 'All fields are required' });
        }

        const newOrder = await Order.create({ date, totalCost, products, customer });

        resp.status(201).json({
            message: 'Order created successfully',
            data: newOrder
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error creating order',
            error: e.message
        });
    }
};

// GET ALL ORDERS
const findAllOrders = async (req, resp) => {
    try {
        const orders = await Order.find();

        resp.status(200).json({
            message: 'All orders loaded',
            data: orders
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error loading orders',
            error: e.message
        });
    }
};

module.exports = {
    createOrder,
    findAllOrders
};
