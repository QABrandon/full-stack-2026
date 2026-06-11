// Post Controller
// This file handles all post-related logic

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

// Create a new post (protected)
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

// Get user's own posts (protected)
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

// Update a post (protected with ownership check)
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

    // CRITICAL: Check if authenticated user owns this post
    if (post.author !== request.user.userId) {
      return response.status(403).json({
        error: 'You can only edit your own posts'
      });
    }

    // User owns the post - allow update
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

// Delete a post (protected with ownership check)
function deletePost(request, response) {
  try {
    const postId = parseInt(request.params.postId);

    // Find the post
    const post = Post.findById(postId);

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    // CRITICAL: Verify ownership before deletion
    if (post.author !== request.user.userId) {
      return response.status(403).json({
        error: 'You can only delete your own posts'
      });
    }

    // User owns the post - allow deletion
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
