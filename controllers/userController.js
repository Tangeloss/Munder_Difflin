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
};

module.exports = userController;
