// Protected Routes Blog Application Frontend

const API_URL = 'http://localhost:3000';
let authToken = null;
let currentUser = null;

// Get DOM elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const allPostsContainer = document.getElementById('all-posts-container');
const dashboardContent = document.getElementById('dashboard-content');
const registerTab = document.getElementById('register-tab');
const loginTab = document.getElementById('login-tab');
const registerPanel = document.getElementById('register-panel');
const loginPanel = document.getElementById('login-panel');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const authMessage = document.getElementById('auth-message');
const userInfo = document.getElementById('user-info');
const viewProfileBtn = document.getElementById('view-profile-btn');
const viewMyPostsBtn = document.getElementById('view-my-posts-btn');
const createPostBtn = document.getElementById('create-post-btn');
const logoutBtn = document.getElementById('logout-btn');
const postModal = document.getElementById('post-modal');
const postForm = document.getElementById('post-form');
const cancelPostBtn = document.getElementById('cancel-post-btn');
const modalTitle = document.getElementById('modal-title');

// Load initial data
window.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem('authToken');
  if (savedToken) {
    authToken = savedToken;
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    currentUser = payload;
    showDashboard();
  }
  loadAllPosts();
});

// Tab switching
registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerPanel.classList.add('active');
  loginPanel.classList.remove('active');
});

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginPanel.classList.add('active');
  registerPanel.classList.remove('active');
});

// Register
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('authToken', authToken);
      showMessage(authMessage, data.message, 'success');
      registerForm.reset();
      showDashboard();
      loadAllPosts();
    } else {
      showMessage(authMessage, data.error, 'error');
    }
  } catch (error) {
    showMessage(authMessage, 'Network error. Check server connection.', 'error');
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('authToken', authToken);
      showMessage(authMessage, data.message, 'success');
      loginForm.reset();
      showDashboard();
      loadAllPosts();
    } else {
      showMessage(authMessage, data.error, 'error');
    }
  } catch (error) {
    showMessage(authMessage, 'Network error. Check server connection.', 'error');
  }
});

// Load all posts (public)
async function loadAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();

    if (response.ok) {
      displayPosts(data.posts, allPostsContainer, false);
    }
  } catch (error) {
    allPostsContainer.innerHTML = '<p class="empty-state">Error loading posts</p>';
  }
}

// View profile (protected)
viewProfileBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();

    if (response.ok) {
      const user = data.user;
      const createdDate = new Date(user.createdAt).toLocaleDateString();
      dashboardContent.innerHTML = `
        <div class="post-card">
          <h3>Your Profile</h3>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Total Posts:</strong> ${user.postCount}</p>
          <p><strong>Member Since:</strong> ${createdDate}</p>
        </div>
      `;
    } else {
      handleAuthError(data);
    }
  } catch (error) {
    dashboardContent.innerHTML = '<p class="empty-state">Error loading profile</p>';
  }
});

// View my posts (protected)
viewMyPostsBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_URL}/my-posts`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();

    if (response.ok) {
      dashboardContent.innerHTML = '<h3>My Posts</h3>';
      displayPosts(data.posts, dashboardContent, true);
    } else {
      handleAuthError(data);
    }
  } catch (error) {
    dashboardContent.innerHTML = '<p class="empty-state">Error loading posts</p>';
  }
});

// Create post button
createPostBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Create New Post';
  document.getElementById('edit-post-id').value = '';
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  postModal.classList.remove('hidden');
});

// Cancel post
cancelPostBtn.addEventListener('click', () => {
  postModal.classList.add('hidden');
  postForm.reset();
});

// Submit post (create or update)
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const postId = document.getElementById('edit-post-id').value;
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  const isEdit = postId !== '';
  const url = isEdit ? `${API_URL}/posts/${postId}` : `${API_URL}/posts`;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (response.ok) {
      postModal.classList.add('hidden');
      postForm.reset();
      loadAllPosts();
      viewMyPostsBtn.click();
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Error saving post');
  }
});

// Edit post
async function editPost(postId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    const data = await response.json();

    if (response.ok) {
      modalTitle.textContent = 'Edit Post';
      document.getElementById('edit-post-id').value = postId;
      document.getElementById('post-title').value = data.post.title;
      document.getElementById('post-content').value = data.post.content;
      postModal.classList.remove('hidden');
    }
  } catch (error) {
    alert('Error loading post');
  }
}

// Delete post
async function deletePost(postId) {
  if (!confirm('Are you sure you want to delete this post?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();

    if (response.ok) {
      loadAllPosts();
      viewMyPostsBtn.click();
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Error deleting post');
  }
}

// Display posts
function displayPosts(posts, container, showActions) {
  if (posts.length === 0) {
    if (container === dashboardContent) {
      container.innerHTML += '<p class="empty-state">You have not created any posts yet.</p>';
    } else {
      container.innerHTML = '<p class="empty-state">No posts to display.</p>';
    }
    return;
  }

  const postsHTML = posts.map(post => {
    const createdDate = new Date(post.createdAt).toLocaleString();
    const actions = showActions ? `
      <div class="post-actions">
        <button class="edit-btn" onclick="editPost('${post._id}')">Edit</button>
        <button class="delete-btn" onclick="deletePost('${post._id}')">Delete</button>
      </div>
    ` : '';

    return `
      <div class="post-card">
        <div class="post-header">
          <div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-meta">By ${post.authorName} on ${createdDate}</p>
          </div>
          ${actions}
        </div>
        <p class="post-content">${post.content}</p>
      </div>
    `;
  }).join('');

  if (container === dashboardContent) {
    container.innerHTML += postsHTML;
  } else {
    container.innerHTML = postsHTML;
  }
}

// Logout
logoutBtn.addEventListener('click', () => {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('authToken');
  dashboardSection.classList.add('hidden');
  authSection.classList.remove('hidden');
  dashboardContent.innerHTML = '';
  showMessage(authMessage, 'Logged out successfully', 'success');
  loadAllPosts();
});

// Helper functions
function showDashboard() {
  authSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  userInfo.textContent = `Logged in as ${currentUser.username}`;
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message show ${type}`;
  setTimeout(() => element.classList.remove('show'), 5000);
}

function handleAuthError(data) {
  alert(data.error);
  if (data.error.includes('expired') || data.error.includes('Invalid')) {
    logoutBtn.click();
  }
}

// Close modal on outside click
postModal.addEventListener('click', (e) => {
  if (e.target === postModal) {
    postModal.classList.add('hidden');
    postForm.reset();
  }
});
