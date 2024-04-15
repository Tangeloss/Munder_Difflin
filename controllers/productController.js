// controllers/productController.js

// controllers/productController.js
// Remove the database initialization from here; it will be passed from the route handlers

// Get product details from the database instead of hardcoded
exports.getProductDetails = (db) => { // Accept db as a parameter
  return (req, res) => {
    const sql = "SELECT * FROM products WHERE product_id = ?";
    const params = [req.params.id];

    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(500).send("Database error");
        console.error(err.message);
      } else if (!row) {
        res.status(404).send("Product not found");
      } else {
        res.json(row);
      }
    });
  };
};

exports.getProducts = (db) => { // Accept db as a parameter
  return (req, res) => {
    const sql = "SELECT * FROM products";
    db.all(sql, [], (err, products) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error fetching products");
        return;
      }
      res.json(products);
    });
  };
};

// In productController.js

exports.getProductsByCategory = (db) => {
  return (req, res) => {
    const sql = "SELECT * FROM products WHERE category_id = ?";
    const params = [req.params.categoryId];

    db.all(sql, params, (err, products) => {
      if (err) {
        res.status(500).send("Error fetching products: " + err.message);
        console.error(err.message);
      } else {
        res.json(products);
      }
    });
  };
};



/*const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/database.db");

// Get product details from database instead of hardcoded
exports.getProductDetails = (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  const params = [req.params.id];

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(500).send("Database error");
    } else if (!row) {
      res.status(404).send("Product not found");
    } else {
      res.json(row);
    }
  });
};

exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.all(sql, [], (err, products) => {
      if (err) {
          console.error(err.message);
          res.status(500).send("Error fetching products");
          return;
      }
      console.log(products); // Check what is being retrieved
      res.json(products);
  });
};*/

/*
// Other methods...

// Stub for getting product details
// controllers/productController.js
exports.getProductDetails = (req, res) => {
  console.log("Received parameters:", req.params.id);

  // Hardcoded data for demonstration
  const products = [
    {
      id: "1",
      name: "Multi-colored Paper 500 Ream",
      description: "Vibrant colors paper.",
      price: 13.99,
      image: "/images/color.png",
    },
    {
        id: "2",
        name: "Red Colored Paper 500 Ream",
        description:
          "Make a bold statement with this bright red colored paper, perfect for high-impact projects.",
        price: 9.99,
        image: "/images/redpack.jpg",
      },
      {
        id: "3",
        name: "Pastel Blue Colored Paper 500 Ream",
        description:
          "Soft blue shades that soothe the eyes and enhance your project's aesthetic.",
        price: 14.94,
        image: "/images/bluepack.jpg",
      },
    // ... other products
  ];

  // Find product by ID
  const product = products.find((p) => p.id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

// Add this method to your productController.js
exports.getProducts = (req, res) => {
  console.log("Fetching all products");
  // Returning a mock list of products
  res.json([
    {
      id: 1,
      name: "Multi-colored Paper 500 Ream",
      description:
        "Stand out with vibrant colors and let your creativity shine with Astrobrights Assorted Color Paper.",
      price: 13.99,
    },
    {
      id: 2,
      name: "Red Colored Paper 500 Ream",
      description:
        "Make a bold statement with this bright red colored paper, perfect for high-impact projects.",
      price: 9.99,
    },
    {
      id: 3,
      name: "Pastel Blue Colored Paper 500 Ream",
      description:
        "Soft blue shades that soothe the eyes and enhance your project's aesthetic.",
      price: 14.94,
    },
  ]);
};

// Add more methods as needed
*/