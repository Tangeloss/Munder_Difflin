const userController = {
    createAccount: function(db) {
        return function(req, res) {
            const { username, password, name, email, usertype } = req.body;
            const createdAt = new Date().toISOString(); // Get current date and time

            const sql = `INSERT INTO Users (created_at, name, email, password, user_type) VALUES (?, ?, ?, ?, ?)`;
            db.run(sql, [createdAt, name, email, password, usertype], function(err) {
                if (err) {
                    console.error('Error creating account:', err);
                    res.status(500).send('Error creating account');
                } else {
                    console.log('Account created successfully with id:', this.lastID);
                    res.status(201).json({ message: "Account created successfully" });
                }
            });
        };
    },
    login: function(db) {
        return function(req, res) {
            const { email, password } = req.body;
            const sql = `SELECT password, user_type FROM Users WHERE email = ?`;
            db.get(sql, [email], (err, row) => {
                if (err) {
                    res.status(500).send('Internal server error');
                    return;
                }
                if (!row || row.password !== password) {
                    res.status(401).send('Invalid email or password');
                    return;
                }
                res.json({ user_type: row.user_type });
            });
        };
    }
};

module.exports = userController;
