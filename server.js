const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database/database.db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "!QAZ2wsx",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const productRoutes = require("./routes/productRoutes")(db);
const userRoutes = require("./routes/userRoutes")(db);
const categoryRoutes = require("./routes/categoryRoutes")(db);
const cartRoutes = require("./routes/cartRoutes")(db);

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).send("You must be logged in to access this");
}

app.use(express.static("public"));

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/cart", isAuthenticated, cartRoutes);
app.use("/", userRoutes);

app.get("/api/session", (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user_type: req.session.user.user_type,
      user_id: req.session.user.id,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.redirect("/login.html");
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Products WHERE product_id = ?", [id], (err, row) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(row);
  });
});

app.post("/api/products/update", (req, res) => {
  const { product_id, name, description, category_id, image_url, price } =
    req.body;
  const sql = `UPDATE Products SET name = ?, description = ?, category_id = ?, image_url = ?, price = ? WHERE product_id = ?`;
  db.run(
    sql,
    [name, description, category_id, image_url, price, product_id],
    function (err) {
      if (err) {
        console.error("Error updating product:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to update product", details: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
