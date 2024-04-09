// In controllers/productController.js
exports.listAllProducts = (req, res) => {
    // Mock data
    res.json([
      { id: 1, name: 'Product 1', price: 10.99 },
      { id: 2, name: 'Product 2', price: 15.99 },
    ]);
  };
  
