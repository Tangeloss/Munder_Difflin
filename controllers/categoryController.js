exports.getCategories = (db) => {
  return (req, res) => {
    const sql = "SELECT * FROM categories";
    db.all(sql, [], (err, categories) => {
      if (err) {
        res.status(500).send("Error fetching categories: " + err.message);
        console.error(err.message);
      } else {
        res.json(categories);
      }
    });
  };
};
