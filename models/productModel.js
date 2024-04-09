// productModel.js

const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database(':memory:'); // You can replace ':memory:' with the path to your SQLite database file

// Create the products table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
    )`);
});

// Stub method to fetch all products
function getAllProducts(callback) {
    db.all('SELECT * FROM products', callback);
}

// Stub method to fetch a product by ID
function getProductById(productId, callback) {
    db.get('SELECT * FROM products WHERE id = ?', [productId], callback);
}

// Stub method to add a new product
function addNewProduct(productData, callback) {
    db.run('INSERT INTO products (name, price) VALUES (?, ?)',
        [productData.name, productData.price],
        callback);
}

module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct
};
