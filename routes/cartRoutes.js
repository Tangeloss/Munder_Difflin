const express = require("express");
const cartController = require("../controllers/cartController");

module.exports = function (db) {
  const router = express.Router();
  router.post("/add", cartController.addToCart(db));
  router.post('/checkout', cartController.handleCheckout(db));
  router.delete("/remove/:cartProductId", cartController.removeFromCart(db));
  router.get("/items", cartController.getCartItems(db));
  router.put("/update/:cartProductId", cartController.updateCartItem(db));

  return router;
};
