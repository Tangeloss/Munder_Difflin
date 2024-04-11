// In controllers/productController.js
/*exports.listAllProducts = (req, res) => {
    // Mock data
    res.json([
      { id: 1, name: 'Product 1', price: 10.99 },
      { id: 2, name: 'Product 2', price: 15.99 },
    ]);
  };*/
  
  const products = [ 
    { id: 1, name: 'Multi-colored Paper 500 Ream', imagePath: '/images/color.png', price: 13.99 },
    { id: 2, name: 'Red Colored Paper 500 Ream', imagePath: '/images/redpack.jpg', price: 9.99 },
    { id: 3, name: 'Pastel Blue Colored Paper 500 Ream', imagePath: '/images/bluepack.jpg', price: 14.94 },
    { id: 4, name: 'Pastel Green Colored Paper 500 Ream', imagePath: '/images/greenpack.jpg', price: 18.95 },
    { id: 5, name: 'Pastel Yellow Colored Paper 500 Ream', imagePath: '/images/yellowpack.jpg', price: 18.95 },
    
    // Add more products as necessary
];
  // controllers/productController.js
//  ... other imports ...

exports.fetchProductById = (req, res) => {
  console.log('Hitting fetch products');
  console.log(req.params.id);
  const productId = req.params.id;
  

  // Find the product
  const product = products.find(p => p.id == productId); 
  
  if (product) {
      res.render('details', { title: 'Munder Difflin - Product Details', product });
  } else {
      // Handle case if the product is not found (perhaps render a 404 page)
      res.status(404).send("Product not found"); 
  }

};

