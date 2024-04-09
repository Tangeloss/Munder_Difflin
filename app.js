const express = require("express");
const app = express();
const productController = require('./controllers/productController');

app.use(express.json());

// Route handler for fetching all products
app.get("/products/all", productController.getAllProductsHandler);

// Route handler for fetching a product by ID
app.get("/products/id/:id", productController.getProductByIdHandler);

// Route handler for fetching products by type
app.get("/products", productController.getProductsByTypeHandler);

// Route handler for adding a new product
app.post("/products/new", productController.addNewProductHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
