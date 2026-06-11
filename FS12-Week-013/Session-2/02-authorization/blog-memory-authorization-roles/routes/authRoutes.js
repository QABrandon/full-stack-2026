// Authentication Routes
// This file defines routes for authentication (register and login)

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /register - Register a new user (defaults to the author role)
router.post('/register', authController.register);

// POST /login - Login an existing user
router.post('/login', authController.login);

// Export the router
module.exports = router;
