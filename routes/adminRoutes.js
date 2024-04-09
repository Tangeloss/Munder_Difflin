// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes
router.post('/upload', adminController.uploadFile);

module.exports = router;
