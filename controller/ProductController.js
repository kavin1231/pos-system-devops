const ProductSchema = require('../model/ProductSchema');

const createProduct = async (req, resp) => {
    try {
        const {description, unitPrice, qtyOnHand} = req.body;
        const createdProduct = new ProductSchema({
            description, unitPrice, qtyOnHand
        });
        await createdProduct.save();
        resp.state(201).json({message: 'Product Saved...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }

};
const updateProduct = async (req, resp) => {
    try {
        const {description, unitPrice, qtyOnHand} = req.body;
        const updatedData = ProductSchema.findByIdAndUpdate({_id: req.params.id},
            {description: description, unitPrice: unitPrice, qtyOnHand: qtyOnHand}, {new: true});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.state(201).json({message: 'Product Updated...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const updateProductQty = async (req, resp) => {
    try {
        const {qtyOnHand} = req.body;
        const updatedData = ProductSchema.findByIdAndUpdate({_id: req.params.id},
            {qtyOnHand: qtyOnHand}, {new: true});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.state(201).json({message: 'Product Updated...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const deleteProduct = async (req, resp) => {
    try {
        const updatedData = ProductSchema.findByIdAndDelete({_id: req.params.id});

        if (!updatedData) return resp.status(500).json({'message': 'Try Again'});
        resp.state(204).json({message: 'Product Deleted...'});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const findProductById = async (req, resp) => {
    try {
        const selectedProduct = ProductSchema.findOne({_id: req.params.id});

        if (!selectedProduct) return resp.status(404).json({'message': 'Not Found'});

        resp.state(200).json({message: 'Product Data', data:selectedProduct});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};
const loadAllProducts = async (req, resp) => {
    try {
        const Products = ProductSchema.find();
        resp.state(200).json({message: 'Product Data', dataList:Products});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
};

module.exports = {createProduct, updateProduct, deleteProduct, findProductById, loadAllProducts, updateProductQty};