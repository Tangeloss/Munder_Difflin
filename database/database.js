const sqlite3 = require('sqlite3').verbose();
const path = require('path');
/*
const dbPath = path.resolve(__dirname, './database/database.db');
const db = new sqlite3.Database(dbPath);

// Create
function createUser(name, email, password, user_type, callback) {
    const createdAt = new Date().toISOString();
    db.run(
        'INSERT INTO Users (created_at, name, email, password, user_type) VALUES (?, ?, ?, ?, ?)',
        [createdAt, name, email, password, user_type],
        callback
    );
}

// Read
function getUsers(callback) {
    db.all('SELECT * FROM Users', callback);
}

// Update
function updateUser(userId, name, email, password, user_type, callback) {
    db.run(
        'UPDATE Users SET name = ?, email = ?, password = ?, user_type = ? WHERE user_id = ?',
        [name, email, password, user_type, userId],
        callback
    );
}

// Delete
function deleteUser(userId, callback) {
    db.run('DELETE FROM Users WHERE user_id = ?', [userId], callback);
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
*/
const dbPath = 'database/db.db';

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

module.exports = db;
