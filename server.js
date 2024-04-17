const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/database.db'); 
const productRoutes = require('./routes/productRoutes')(db);
const userRoutes = require('./routes/userRoutes')(db);
const categoryRoutes = require('./routes/categoryRoutes')(db);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: '!QAZ2wsx',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productRoutes); 
app.use('/categories', categoryRoutes); 
app.use('/users', userRoutes);
app.use('/', userRoutes); // This might be redundant if userRoutes does not handle root '/'

app.get('/api/session', (req, res) => {
  if (req.session.user) {
      res.json({ loggedIn: true, user_type: req.session.user.user_type });
  } else {
      res.json({ loggedIn: false });
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out');
      }
      res.redirect('/login.html'); 
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Products WHERE product_id = ?', [id], (err, row) => {
      if (err) {
          console.error('Database error:', err.message);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (!row) {
          res.status(404).json({ error: 'Product not found' });
          return;
      }
      res.json(row);
  });
});



app.post('/api/products/update', (req, res) => {
  const { product_id, name, description, category_id, image_path, price } = req.body;
  const sql = `UPDATE products SET name = ?, description = ?, category_id = ?, image_path = ?, price = ? WHERE product_id = ?`;
  const params = [name, description, category_id, image_path, price, product_id];

  db.run(sql, params, function(err) {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({ message: 'Product Updated Successfully', changes: this.changes });
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
