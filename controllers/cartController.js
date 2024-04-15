const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Users\\kenne\\Downloads\\MunderDifflin\\database\\database.db', sqlite3.OPEN_READWRITE);

exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    const sql = 'INSERT INTO cart (productId, quantity) VALUES (?, ?)';

    db.run(sql, [productId, quantity], function(err) {
        if (err) {
            res.status(400).send(`Error adding to cart: ${err.message}`);
            return;
        }
        res.json({ id: this.lastID, message: 'Added to cart' });
    });
};

exports.removeFromCart = (req, res) => {
    const { cartId } = req.params; // Assuming cart ID is sent as a URL parameter
    const sql = 'DELETE FROM cart WHERE id = ?';

    db.run(sql, [cartId], function(err) {
        if (err) {
            res.status(400).send(`Error removing from cart: ${err.message}`);
            return;
        }
        res.json({ message: 'Removed from cart' });
    });
};

exports.getCartItems = (req, res) => {
    const sql = 'SELECT * FROM cart';

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).send(`Error fetching cart items: ${err.message}`);
            return;
        }
        res.json(rows);
    });
};
