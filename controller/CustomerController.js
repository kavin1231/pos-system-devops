const Customer = require('../model/CustomerSchema');


// CREATE CUSTOMER
const createCustomer = async (req, resp) => {
    try {
        const { name, address, salary, contact } = req.body;

        // Validate input
        if (!name || !address || !salary || !contact) {
            return resp.status(400).json({ message: 'All fields are required' });
        }

        const newCustomer = await Customer.create({ name, address, salary, contact });
        await newCustomer.save();

        return resp.status(201).json({
            message: 'Customer created successfully',
            data: newCustomer
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error creating customer',
            error: e.message
        });
    }
};


// UPDATE CUSTOMER
const updateCustomer = async (req, resp) => {
    try {
        const { id } = req.params;
        const { name, address, salary, contact } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, address, salary, contact },
            { new: true }   // return updated document
        );

        if (!updatedCustomer) {
            return resp.status(404).json({ message: 'Customer not found' });
        }

        resp.status(200).json({
            message: 'Customer updated successfully',
            data: updatedCustomer
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error updating customer',
            error: e.message
        });
    }
};


// DELETE CUSTOMER
const deleteCustomer = async (req, resp) => {
    try {
        const { id } = req.params;

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return resp.status(404).json({ message: 'Customer not found' });
        }

        resp.status(200).json({
            message: 'Customer deleted successfully'
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error deleting customer',
            error: e.message
        });
    }
};


// FIND CUSTOMER BY ID
const findCustomerById = async (req, resp) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return resp.status(404).json({ message: 'Customer not found' });
        }

        resp.status(200).json({
            message: 'Customer found',
            data: customer
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error retrieving customer',
            error: e.message
        });
    }
};


// LOAD ALL CUSTOMERS
const loadAllCustomers = async (req, resp) => {
    try {
        const customers = await Customer.find();

        resp.status(200).json({
            message: 'All customers loaded',
            data: customers
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error loading customers',
            error: e.message
        });
    }
};


module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomerById,
    loadAllCustomers
};
