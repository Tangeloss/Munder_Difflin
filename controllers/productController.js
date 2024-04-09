<<<<<<< Updated upstream
// productController.js

const productController = {
    getAllProductsHandler: async (req, res) => {
        try {
            // Code to fetch all products
            res.status(200).json({ message: 'All products fetched successfully' });
        } catch (error) {
            console.error('Error fetching all products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getProductByIdHandler: async (req, res) => {
        try {
            // Code to fetch a product by ID
            const productId = req.params.id;
            res.status(200).json({ message: `Product with ID ${productId} fetched successfully` });
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getProductsByTypeHandler: async (req, res) => {
        try {
            // Code to fetch products by type
            const productType = req.query.type;
            res.status(200).json({ message: `Products of type ${productType} fetched successfully` });
        } catch (error) {
            console.error('Error fetching products by type:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addNewProductHandler: async (req, res) => {
        try {
            // Code to add a new product
            res.status(200).json({ message: 'New product added successfully' });
        } catch (error) {
            console.error('Error adding new product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = productController;
=======
// In controllers/productController.js
exports.listAllProducts = (req, res) => {
    // Mock data
    res.json([
      { id: 1, name: 'Product 1', price: 10.99 },
      { id: 2, name: 'Product 2', price: 15.99 },
    ]);
  };
  
>>>>>>> Stashed changes
