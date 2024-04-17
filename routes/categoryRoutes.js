const express = require('express');
const categoryController = require('../controllers/categoryController');

module.exports = function(db) {
  const router = express.Router();
  router.get('/', categoryController.getCategories(db));
  return router;
};
