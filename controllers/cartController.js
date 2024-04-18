const { use } = require("passport");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "C:\\Users\\kenne\\Downloads\\MunderDifflin\\database\\database.db",
  sqlite3.OPEN_READWRITE
);

exports.addToCart = function (db) {
  return function (req, res) {
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .send("You need to be logged in to add items to the cart.");
    }

    const { productId, quantity } = req.body;
    const userCartId = req.session.user.cart_id;
    if (typeof productId !== "number" || typeof quantity !== "number") {
      return res.status(400).send("Invalid product ID or quantity");
    }

    const sql =
      "INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)";
    db.run(sql, [userCartId, productId, quantity], function (err) {
      if (err) {
        console.error("Error adding to cart:", err.message);
        return res.status(500).send(err.message);
      }
      res
        .status(201)
        .json({ message: "Product added to cart", id: this.lastID });
    });
  };
};

exports.removeFromCart = function (db) {
  return function (req, res) {
    if (!req.session.user) {
      return res
        .status(401)
        .send("You need to be logged in to remove items from the cart.");
    }

    const user_id = req.session.user.id;
    const { cartProductId } = req.params;

    const sql =
      "DELETE FROM CartProducts WHERE cart_products_id = ? AND cart_id IN (SELECT cart_id FROM Carts WHERE user_id = ?)";
    db.run(sql, [cartProductId, user_id], function (err) {
      if (err) {
        return res.status(400).send(`Error removing from cart: ${err.message}`);
      }
      if (this.changes === 0) {
        return res
          .status(404)
          .send(
            "Cart item not found or you don't have permission to update this item."
          );
      }
      res.json({ message: "Removed from cart" });
    });
  };
};

exports.getCartItems = function (db) {
  return function (req, res) {
    if (!req.session.user) {
      return res.status(401).send("You must be logged in to view cart items.");
    }
    const user_id = req.session.user.id;

    const sql = `
      SELECT cp.cart_products_id, cp.quantity, p.product_id, p.name, p.description, p.price, p.image_url
      FROM CartProducts cp
      JOIN Products p ON cp.product_id = p.product_id
      WHERE cp.cart_id IN (SELECT cart_id FROM Carts WHERE user_id = ?)`;

    db.all(sql, [user_id], (err, rows) => {
      if (err) {
        return res
          .status(500)
          .send(`Error fetching cart items: ${err.message}`);
      }
      if (rows && rows.length > 0) {
        res.json(rows);
      } else {
        res.json([]);
      }
    });
  };
};

exports.updateCartItem = function (db) {
  return function (req, res) {
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .send("You need to be logged in to update the cart.");
    }

    const user_id = req.session.user.id;
    const { cartProductId } = req.params;
    const { newQuantity } = req.body;

    if (!cartProductId || newQuantity === undefined) {
      return res.status(400).send("Missing cart product ID or new quantity.");
    }

    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      return res.status(400).send("Quantity must be a positive integer.");
    }

    const sql = `
    UPDATE CartProducts 
    SET quantity = ?
    WHERE cart_products_id = ?
      AND cart_id IN (SELECT cart_id FROM Carts WHERE user_id = ?)
  `;

    db.run(sql, [quantity, cartProductId, user_id], function (err) {
      if (err) {
        console.error("Error updating cart item:", err.message);
        return res.status(500).send(`Error updating cart item: ${err.message}`);
      }
      if (this.changes === 0) {
        return res
          .status(404)
          .send(
            "Cart item not found or you don't have permission to update this item."
          );
      }
      res.json({ message: "Cart item updated successfully." });
    });
  };
};
