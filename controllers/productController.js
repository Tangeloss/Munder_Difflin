// productController.js
const { getAllProducts, getProductById, getProductsByType, addNewProduct } = require('../models/productModel');

// Route handler for fetching all products
function getAllProductsHandler(req, res) {
    const products = getAllProducts();
    res.json(products);
}

// Route handler for fetching a product by ID
function getProductByIdHandler(req, res) {
    const productId = req.params.id;
    const product = getProductById(productId);
    res.json(product);
}

// Route handler for fetching products by type
function getProductsByTypeHandler(req, res) {
    const type = req.query.type;
    const products = getProductsByType(type);
    res.json(products);
}

// Route handler for adding a new product
function addNewProductHandler(req, res) {
    const productData = req.body;
    const result = addNewProduct(productData);
    res.json(result);
}

module.exports = {
    getAllProductsHandler,
    getProductByIdHandler,
    getProductsByTypeHandler,
    addNewProductHandler
};
