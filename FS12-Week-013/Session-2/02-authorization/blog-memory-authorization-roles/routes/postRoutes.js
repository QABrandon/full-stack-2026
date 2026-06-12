// Post Routes
// This file defines routes for post operations.
// Notice the TWO middleware steps for protected routes:
//   1. authenticateToken - confirms the user is logged in (who are you?)
//   2. requireRole(...)  - confirms they have permission (what can you do?)

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');

// Public routes (no authentication required)

// GET /posts - Get all posts (anyone can read)
router.get('/posts', postController.getAllPosts);

// GET /posts/:postId - Get single post by ID (anyone can read)
router.get('/posts/:postId', postController.getPostById);

// Protected routes (authentication + role check required)

// POST /posts - Create a new post (only admins and authors can create)
router.post(
  '/posts',
  authenticateToken,
  requireRole('admin', 'author'),
  postController.createPost
);

// GET /my-posts - Get the logged-in user's own posts
router.get('/my-posts', authenticateToken, postController.getMyPosts);

// PUT /posts/:postId - Update a post
// Role check allows admin or author; controller does the extra ownership check.
router.put(
  '/posts/:postId',
  authenticateToken,
  requireRole('admin', 'author'),
  postController.updatePost
);

// DELETE /posts/:postId - Delete a post
// Role check allows admin or author; controller lets admins delete ANY post.
router.delete(
  '/posts/:postId',
  authenticateToken,
  requireRole('admin', 'author'),
  postController.deletePost
);

// Export the router
module.exports = router;
