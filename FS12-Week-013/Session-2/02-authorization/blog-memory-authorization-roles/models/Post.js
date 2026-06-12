// Post Model
// This file manages post data in memory

// In-memory storage for posts
const posts = [];

// ID counter for generating unique post IDs
let postIdCounter = 1;

// Post model object with methods to interact with post data
const Post = {
  // Get all posts
  getAll() {
    return posts;
  },

  // Get all posts sorted by creation date (newest first)
  getAllSorted() {
    return posts.slice().sort((a, b) => b.createdAt - a.createdAt);
  },

  // Find post by ID
  findById(postId) {
    return posts.find(post => post.id === postId);
  },

  // Find all posts by a specific author
  findByAuthor(authorId) {
    const userPosts = posts.filter(post => post.author === authorId);
    return userPosts.sort((a, b) => b.createdAt - a.createdAt);
  },

  // Count posts by author
  countByAuthor(authorId) {
    return posts.filter(post => post.author === authorId).length;
  },

  // Create a new post
  create(postData) {
    const newPost = {
      id: postIdCounter++,
      title: postData.title,
      content: postData.content,
      author: postData.author,
      authorName: postData.authorName,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    posts.push(newPost);
    return newPost;
  },

  // Update post by ID
  updateById(postId, updateData) {
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return null;
    }

    // Update post properties
    if (updateData.title) post.title = updateData.title;
    if (updateData.content) post.content = updateData.content;
    post.updatedAt = new Date();

    return post;
  },

  // Delete post by ID
  deleteById(postId) {
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return false;
    }

    posts.splice(postIndex, 1);
    return true;
  },

  // Check if user owns a post
  isOwner(postId, userId) {
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return false;
    }

    return post.author === userId;
  }
};

// Export the Post model
module.exports = Post;
