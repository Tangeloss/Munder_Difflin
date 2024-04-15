const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define routes and link to controller methods
router.post('/cart/add', cartController.addToCart);
router.delete('/cart/remove/:cartId', cartController.removeFromCart);
router.get('/cart/items', cartController.getCartItems);

module.exports = router;
