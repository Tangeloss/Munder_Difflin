const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Products Route
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.get('/product/:id', (req, res) => {
    // Simulated product data
    const product = {
        id: req.params.id,
        name: 'Product Name',
        description: 'Product Description',
        price: 99.99
    };

    // Render the 'product-details' view and pass the product data to it
    res.render('product-details', { product });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
