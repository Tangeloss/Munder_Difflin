const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

module.exports = function (db) {
  router.get("/category/:categoryId", productController.getProductsByCategory(db));
  router.get("/search", productController.searchProducts(db));
  router.get("/:id", productController.getProductDetails(db));
  router.get("/", productController.getProducts(db));

  return router;
};

