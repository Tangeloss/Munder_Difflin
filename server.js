const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
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
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/', userRoutes);


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
  const { product_id, name, description, category_id, image_url, price } = req.body;
  const sql = `UPDATE Products SET name = ?, description = ?, category_id = ?, image_url = ?, price = ? WHERE product_id = ?`;
  db.run(sql, [name, description, category_id, image_url, price, product_id], function (err) {
    if (err) {
      console.error("Error updating product:", err.message);
      return res.status(500).json({ error: 'Failed to update product', details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

app.post('/api/products/create', (req, res) => {
  const { product_id, name, description, category_id, image_url, price, is_featured = 0 } = req.body;
  const sql = "INSERT INTO Products (name, description, category_id, image_url, price, is_featured) VALUES (?, ?, ?, ?, ?, ?) WHERE product_id = ?";
  db.run(sql, [name, description, category_id, image_url, price, is_featured, product_id], function (err) {
    if (err) {
      console.error("Error creating product:", err.message);
      return res.status(500).json({ error: 'Failed to create product', details: err.message });
    }
    res.status(201).json({ message: 'Product created successfully', product_id: this.lastID });
  });
});

function getDBConnection() {
  return new sqlite3.Database('./database/database.db');
}

app.post('/api/products/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const filePath = req.file.path;

  try {
    const data = fs.readFileSync(filePath);
    const products = JSON.parse(data.toString());
    await insertProductsIntoDatabase(products);
    res.status(201).json({ message: 'Products uploaded successfully!' });
  } catch (error) {
    console.error('Failed to process file:', error);
    res.status(500).json({ message: 'Failed to upload products', error: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }
});


async function insertProductsIntoDatabase(products) {
  const db = await getDBConnection();
  try {
    await db.run('BEGIN TRANSACTION');
    for (const product of products) {
      const { name, description, category_id, image_url, price, is_featured = 0 } = product;
      await db.run(
        "INSERT INTO Products (name, description, category_id, image_url, price, is_featured) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, category_id, image_url, price, is_featured]
      );
    }
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  } finally {
    db.close();
  }
}


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
