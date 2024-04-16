const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/database.db'); // Make sure this path is correct.
const productRoutes = require('./routes/productRoutes')(db);
<<<<<<< Updated upstream
//const cartRoutes = require('./routes/cartRoutes')(db);
=======
>>>>>>> Stashed changes
const categoryRoutes = require('./routes/categoryRoutes')(db); // Import the function and invoke it immediately with `db`
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));
app.use('/products', productRoutes); // Use the router on the '/products' path
app.use('/categories', categoryRoutes); 
<<<<<<< Updated upstream
//app.use('/cart', cartRoutes); // Use cart routes
=======
>>>>>>> Stashed changes

// Example route for the root path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




























/*const express = require('express');
const multer = require('multer');
// Using sqlite3
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./path_to_database.db');
//const productRoutes = require('./routes/productRoutes');
const productRoutes = require('./routes/productRoutes')(db);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to attach db to req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Now in any route, you can access req.db to get the database connection


// Serve static files from 'public' directory
app.use(express.static('public'));
app.use('/', productRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
