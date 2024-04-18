const userController = {
  createAccount: function (db) {
    return function (req, res) {
      const { name, email, password, usertype } = req.body;
      const createdAt = new Date().toISOString(); // Get current date and time
  
      const userSql = `INSERT INTO Users (created_at, name, email, password, user_type) VALUES (?, ?, ?, ?, ?)`;
  
      // Insert a new user into the Users table
      db.run(userSql, [createdAt, name, email, password, usertype], function (userErr) {
        if (userErr) {
          console.error('Error creating account:', userErr);
          return res.status(500).send('Error creating account');
        }
  
        const userId = this.lastID;
  
        // Insert a new cart into the Carts table, linked to the newly created user
        const cartSql = `INSERT INTO Carts (status, created_at, user_id) VALUES (?, ?, ?)`;
        db.run(cartSql, ['active', createdAt, userId], (cartErr) => { // Arrow function preserves `this`
          if (cartErr) {
            console.error('Error creating cart for user:', cartErr);
            return res.status(500).send('Error creating cart for user');
          }
          console.log('Account and cart created successfully with user_id:', userId);
          res.status(201).json({ message: "Account and cart created successfully", user_id: userId });
        });
      });
    };
  },
  
    login: function (db) {
      return function (req, res) {
        const { email, password } = req.body;
  
        // Fetch user data from the Users table
        db.get(`SELECT user_id, password, user_type FROM Users WHERE email = ?`, [email], (userErr, userRow) => {
          if (userErr) {
            return res.status(500).send('Internal server error');
          }
          if (!userRow || userRow.password !== password) {
            return res.status(401).send('Invalid email or password');
          }
  
          // Fetch the cart_id from the Carts table
          db.get('SELECT cart_id FROM Carts WHERE user_id = ?', [userRow.user_id], (cartErr, cartRow) => {
            if (cartErr) {
              return res.status(500).send('Internal server error while fetching cart');
            }
            if (cartRow) {
              // Set the user session with user_id, user_type, and cart_id
              req.session.user = {
                id: userRow.user_id,
                email: email,
                user_type: userRow.user_type,
                cart_id: cartRow.cart_id
              };
              res.json({ user_type: userRow.user_type, cart_id: cartRow.cart_id });
            } else {
              // Handle case where cartRow is not found, which means cart is not set up for user
              res.status(404).send('Cart not found for user');
            }
          });
        });
      };
    }
  };
  
  module.exports = userController;
  