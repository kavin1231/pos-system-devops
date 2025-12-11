const Product = require('../model/ProductSchema');

// CREATE PRODUCT
const createProduct = async (req, resp) => {
    try {
        const { description, unitPrice, qtyOnHand } = req.body;

        // Validate input
        if (!description || unitPrice == null || qtyOnHand == null) {
            return resp.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = await Product.create({ description, unitPrice, qtyOnHand });

        resp.status(201).json({
            message: 'Product created successfully',
            data: newProduct
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error creating product',
            error: e.message
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, resp) => {
    try {
        const { id } = req.params;
        const { description, unitPrice, qtyOnHand } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { description, unitPrice, qtyOnHand },
            { new: true } // return updated document
        );

        if (!updatedProduct) {
            return resp.status(404).json({ message: 'Product not found' });
        }

        resp.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error updating product',
            error: e.message
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, resp) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return resp.status(404).json({ message: 'Product not found' });
        }

        resp.status(200).json({
            message: 'Product deleted successfully'
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error deleting product',
            error: e.message
        });
    }
};


// FIND PRODUCT BY ID
const findProductById = async (req, resp) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return resp.status(404).json({ message: 'Product not found' });
        }

        resp.status(200).json({
            message: 'Product found',
            data: product
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error retrieving product',
            error: e.message
        });
    }
};


// LOAD ALL PRODUCTS
const loadAllProducts = async (req, resp) => {
    try {
        const products = await Product.find();

        resp.status(200).json({
            message: 'All products loaded',
            data: products
        });

    } catch (e) {
        resp.status(500).json({
            message: 'Error loading products',
            error: e.message
        });
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    loadAllProducts
};
