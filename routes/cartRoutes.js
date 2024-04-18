const express = require('express');
const cartController = require('../controllers/cartController');

module.exports = function(db) {
  const router = express.Router();

  // Assuming cartController.addToCart is properly set to handle db and request
  router.post('/add', cartController.addToCart(db));
  router.delete('/remove/:cartProductId', cartController.removeFromCart(db));
  router.get('/items', cartController.getCartItems(db));
  router.put('/update/:cartProductId', cartController.updateCartItem(db));


  return router;
};
