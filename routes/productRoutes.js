// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes
router.get('/:productId', productController.getProduct);
router.post('/edit/:productId', productController.editProduct);
router.post('/add', productController.addProduct);

module.exports = router;
