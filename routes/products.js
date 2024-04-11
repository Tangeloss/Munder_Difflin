// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
//import { fetchProducts, fetchProductById } from '../public/js/fetchProducts';
const { fetchProducts } = require('../public/js/fetchProducts');

router.get('/', (req, res) => {
    const products = [
        { id: 1, name: 'Multi-colored Paper 500 Ream', imagePath: '/images/color.png', price: 13.99 },
        { id: 2, name: 'Red Colored Paper 500 Ream', imagePath: '/images/redpack.jpg', price: 9.99 },
        { id: 3, name: 'Pastel Blue Colored Paper 500 Ream', imagePath: '/images/bluepack.jpg', price: 14.94 },
        { id: 4, name: 'Pastel Green Colored Paper 500 Ream', imagePath: '/images/greenpack.jpg', price: 18.95 },
        { id: 5, name: 'Pastel Yellow Colored Paper 500 Ream', imagePath: '/images/yellowpack.jpg', price: 18.95 },
        
        // Add more products as necessary
    ];

    res.render('products', { products });
});
router.get('/products/:productId', productsController.fetchProductById); 
// routes/products.js 

router.get('/', async (req, res) => {
  const products = await fetchProducts();
  res.render('products', { products });
});

router.get('/:productId', async (req, res) => {
  const product = await fetchProductById(req.params.productId);
  res.render('productDetail', { product }); 
});


module.exports = router;
