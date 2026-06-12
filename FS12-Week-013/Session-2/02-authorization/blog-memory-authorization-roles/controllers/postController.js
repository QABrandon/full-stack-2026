// Post Controller
// This file handles all post-related logic.
// Role checks happen in the route file (via requireRole middleware).
// Ownership checks happen here because they need the post data itself.

const Post = require('../models/Post');

// Get all posts (public)
function getAllPosts(request, response) {
  try {
    const posts = Post.getAllSorted();

    response.json({
      count: posts.length,
      posts: posts
    });

  } catch (error) {
    console.error('Get posts error:', error);
    response.status(500).json({ error: 'Failed to get posts' });
  }
}

// Get single post by ID (public)
function getPostById(request, response) {
  try {
    const postId = parseInt(request.params.postId);

    const post = Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    response.json({ post: post });

  } catch (error) {
    console.error('Get post error:', error);
    response.status(500).json({ error: 'Failed to get post' });
  }
}

// Create a new post (protected - admin or author role)
function createPost(request, response) {
  try {
    const title = request.body.title;
    const content = request.body.content;

    // Validate input
    if (!title || !content) {
      return response.status(400).json({
        error: 'Title and content are required'
      });
    }

    // Create new post with authenticated user as author
    const newPost = Post.create({
      title: title,
      content: content,
      author: request.user.userId,
      authorName: request.user.username
    });

    response.status(201).json({
      message: 'Post created successfully',
      post: newPost
    });

  } catch (error) {
    console.error('Create post error:', error);
    response.status(500).json({ error: 'Failed to create post' });
  }
}

// Get the logged-in user's own posts (protected)
function getMyPosts(request, response) {
  try {
    // Get posts by the authenticated user
    const posts = Post.findByAuthor(request.user.userId);

    response.json({
      count: posts.length,
      posts: posts
    });

  } catch (error) {
    console.error('Get my posts error:', error);
    response.status(500).json({ error: 'Failed to get posts' });
  }
}

// Update a post
// Two different rules apply here:
//   - An admin can update ANY post
//   - An author can only update their OWN posts
function updatePost(request, response) {
  try {
    const postId = parseInt(request.params.postId);
    const title = request.body.title;
    const content = request.body.content;

    // Find the post
    const post = Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    // Admins get to skip the ownership check entirely
    const isAdmin = request.user.roleName === 'admin';
    const isOwner = post.author === request.user.userId;

    if (!isAdmin && !isOwner) {
      return response.status(403).json({
        error: 'You can only edit your own posts (or you must be an admin)'
      });
    }

    // Allowed - perform the update
    const updatedPost = Post.updateById(postId, { title, content });

    response.json({
      message: 'Post updated successfully',
      post: updatedPost
    });

  } catch (error) {
    console.error('Update post error:', error);
    response.status(500).json({ error: 'Failed to update post' });
  }
}

// Delete a post
// Same rule as updatePost: admin can delete any post, author only their own.
function deletePost(request, response) {
  try {
    const postId = parseInt(request.params.postId);

    // Find the post
    const post = Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    // Admins can delete any post; everyone else must own the post
    const isAdmin = request.user.roleName === 'admin';
    const isOwner = post.author === request.user.userId;

    if (!isAdmin && !isOwner) {
      return response.status(403).json({
        error: 'You can only delete your own posts (or you must be an admin)'
      });
    }

    // Allowed - delete the post
    Post.deleteById(postId);

    response.json({
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Delete post error:', error);
    response.status(500).json({ error: 'Failed to delete post' });
  }
}

// Export controller functions
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getMyPosts,
  updatePost,
  deletePost
};
