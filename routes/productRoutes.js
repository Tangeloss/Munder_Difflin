// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

module.exports = function(db) {
  router.get('/:id', productController.getProductDetails(db));
  router.get('/', productController.getProducts(db));
  router.get('/category/:categoryId', productController.getProductsByCategory(db));
  return router;
};






























/*const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes and link to controller methods
//router.get('/products/:id', productController.getProductDetails);

// Add this route to your productRoutes.js
router.get('/products', productController.getProducts);


module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
    
    router.get('/products/:id', (req, res) => {
        const id = req.params.id;
        db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
            if (err) {
                res.status(500).send("Error fetching product");
                console.error(err.message);
            } else if (row) {
                res.json(row);
            } else {
                res.status(404).send("Product not found");
            }
        });
    });
    
    return router;
  };
module.exports = router;*/
