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

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out');
      }
      res.redirect('/login.html'); 
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
