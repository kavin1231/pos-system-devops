const CustomerSchema = require('../model/CustomerSchema');

const createCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;
        const createdCustomer = new CustomerSchema({
            name, address, salary, contact
        });
        await createdCustomer.save();
        resp.state(201).json({message: 'Customer Saved...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }

};
const updateCustomer = async (req, resp) => {
    try {
        const {name, address, salary, contact} = req.body;
        const updatedData = CustomerSchema.findByIdAndUpdate({_id: req.params.id},
            {name: name, address: address, salary: salary, contact: contact}, {new: true});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.state(201).json({message: 'Customer Updated...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const deleteCustomer = async (req, resp) => {
    try {
        const updatedData = CustomerSchema.findByIdAndDelete({_id: req.params.id});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.state(204).json({message: 'Customer Deleted...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const findCustomerById = async (req, resp) => {
    try {
        const selectedCustomer = CustomerSchema.findOne({_id: req.params.id});

        if (!selectedCustomer) return resp.status(404).json({'message': 'Not Found'});

        resp.state(200).json({message: 'Customer Data', data:selectedCustomer});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const loadAllCustomers = async (req, resp) => {
    try {
        const customers = CustomerSchema.find();
        resp.state(200).json({message: 'Customer Data', dataList:customers});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};

module.exports = {createCustomer, updateCustomer, deleteCustomer, findCustomerById, loadAllCustomers};