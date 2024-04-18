exports.getProductDetails = (db) => {
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

exports.getProducts = (db) => {
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

exports.searchProducts = (db) => {
  return (req, res) => {
    const query = `%${req.query.search}%`;
    db.all(
      "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?",
      [query, query],
      (err, products) => {
        if (err) {
          res.status(500).send("Error fetching products: " + err.message);
          console.error(err.message);
        } else {
          res.json(products);
        }
      }
    );
  };
};
