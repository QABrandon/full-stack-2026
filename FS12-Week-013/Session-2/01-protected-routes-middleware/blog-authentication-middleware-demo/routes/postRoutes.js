// Post Routes
// This file defines routes for post operations

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');

// Public routes (no authentication required)

// GET /posts - Get all posts
router.get('/posts', postController.getAllPosts);

// GET /posts/:postId - Get single post by ID
router.get('/posts/:postId', postController.getPostById);

// Protected routes (authentication required)

// POST /posts - Create a new post
router.post('/posts', authenticateToken, postController.createPost);

// GET /my-posts - Get user's own posts
router.get('/my-posts', authenticateToken, postController.getMyPosts);

// PUT /posts/:postId - Update a post (with ownership check)
router.put('/posts/:postId', authenticateToken, postController.updatePost);

// DELETE /posts/:postId - Delete a post (with ownership check)
router.delete('/posts/:postId', authenticateToken, postController.deletePost);

// Export the router
module.exports = router;
