const db = require('../database/database');

class Product {
    // Find all products
    static findAll(callback) {
        const sql = 'SELECT * FROM products';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);
        });
    }

    // Find a single product by ID
    static findById(id, callback) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            callback(row);
        });
    }

    // Add a new product
    static create(data, callback) {
        const { name, description, price, category_id, image_path } = data;
        const sql = 'INSERT INTO products (name, description, price, category_id, image_path) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [name, description, price, category_id, image_path], function (err) {
            if (err) {
                return console.error(err.message);
            }
            callback({ id: this.lastID });
        });
    }

    // Update an existing product
    static update(data, callback) {
        const { id, name, description, price, category_id, image_path } = data;
        const sql = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_path = ? WHERE id = ?';
        db.run(sql, [name, description, price, category_id, image_path, id], function (err) {
            if (err) {
                return console.error(err.message);
            }
            callback({ id: this.changes });
        });
    }

    // Delete a product
    static delete(id, callback) {
        const sql = 'DELETE FROM products WHERE id = ?';
        db.run(sql, id, function (err) {
            if (err) {
                return console.error(err.message);
            }
            callback({ deleted: this.changes });
        });
    }
}

module.exports = Product;
