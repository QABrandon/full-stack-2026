// User Routes
// This file defines routes for user operations

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

// Protected routes (authentication required)

// GET /profile - Get user profile
router.get('/profile', authenticateToken, userController.getProfile);

// Public routes (development only)

// GET /users - Get all users
router.get('/users', userController.getAllUsers);

// Export the router
module.exports = router;
