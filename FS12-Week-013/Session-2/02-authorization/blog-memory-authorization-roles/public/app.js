// Role-Based Authorization Blog Application Frontend

const API_URL = 'http://localhost:3000';
let authToken = null;
let currentUser = null;

// Get DOM elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const allPostsContainer = document.getElementById('all-posts-container');
const rolesContainer = document.getElementById('roles-container');
const dashboardContent = document.getElementById('dashboard-content');
const registerTab = document.getElementById('register-tab');
const loginTab = document.getElementById('login-tab');
const registerPanel = document.getElementById('register-panel');
const loginPanel = document.getElementById('login-panel');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const authMessage = document.getElementById('auth-message');
const userInfo = document.getElementById('user-info');
const userRoleInfo = document.getElementById('user-role-info');
const viewProfileBtn = document.getElementById('view-profile-btn');
const viewMyPostsBtn = document.getElementById('view-my-posts-btn');
const createPostBtn = document.getElementById('create-post-btn');
const adminPanelBtn = document.getElementById('admin-panel-btn');
const logoutBtn = document.getElementById('logout-btn');
const postModal = document.getElementById('post-modal');
const postForm = document.getElementById('post-form');
const cancelPostBtn = document.getElementById('cancel-post-btn');
const modalTitle = document.getElementById('modal-title');

// Build a normalized currentUser object that always has both `id` and `userId`.
// The login response uses `id` while the JWT payload uses `userId`. We need
// both shapes available so ownership checks (post.author === currentUser.userId)
// work whether currentUser came from a fresh login or from decoding the token
// on page reload.
function normalizeUser(rawUser) {
  return {
    ...rawUser,
    id: rawUser.id !== undefined ? rawUser.id : rawUser.userId,
    userId: rawUser.userId !== undefined ? rawUser.userId : rawUser.id
  };
}

// Load initial data
window.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem('authToken');
  if (savedToken) {
    authToken = savedToken;
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    currentUser = normalizeUser(payload);
    showDashboard();
  }
  loadAllPosts();
  loadRoles();
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
      currentUser = normalizeUser(data.user);
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
      currentUser = normalizeUser(data.user);
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

// Load the list of roles and show them on the page
// This uses the public GET /roles endpoint. It gives students a visual way
// to see exactly what each role can do.
async function loadRoles() {
  try {
    const response = await fetch(`${API_URL}/roles`);
    const data = await response.json();

    if (!response.ok) {
      rolesContainer.innerHTML = '<p class="empty-state">Error loading roles</p>';
      return;
    }

    const rolesHTML = data.roles.map(role => {
      const permissions = role.permissions.length
        ? role.permissions.map(p => `<li>${p}</li>`).join('')
        : '<li>(no special permissions)</li>';

      return `
        <div class="role-card role-${role.name}">
          <div class="role-card-header">
            <span class="role-badge role-${role.name}">${role.name}</span>
            <strong>${role.description}</strong>
          </div>
          <p><em>Permissions:</em></p>
          <ul class="permission-list">${permissions}</ul>
        </div>
      `;
    }).join('');

    rolesContainer.innerHTML = rolesHTML;
  } catch (error) {
    rolesContainer.innerHTML = '<p class="empty-state">Error loading roles</p>';
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
      const permissionItems = user.permissions.length
        ? user.permissions.map(p => `<li>${p}</li>`).join('')
        : '<li>(no special permissions)</li>';

      dashboardContent.innerHTML = `
        <div class="post-card">
          <h3>Your Profile</h3>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Role:</strong> <span class="role-badge role-${user.roleName}">${user.roleName}</span></p>
          <p><strong>Role description:</strong> ${user.roleDescription}</p>
          <p><strong>Total Posts:</strong> ${user.postCount}</p>
          <p><strong>Member Since:</strong> ${createdDate}</p>
          <p><strong>Permissions granted by your role:</strong></p>
          <ul class="permission-list">${permissionItems}</ul>
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

// Admin panel button - loads the user list and a role switcher for each user.
// This hits the admin-only GET /users endpoint.
adminPanelBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    const data = await response.json();

    if (!response.ok) {
      handleAuthError(data);
      return;
    }

    // Build a simple table with a role dropdown per user
    const rows = data.users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><span class="role-badge role-${user.roleName}">${user.roleName}</span></td>
        <td>
          <div class="role-select-form">
            <select data-user-id="${user.id}" class="role-select">
              <option value="admin" ${user.roleName === 'admin' ? 'selected' : ''}>admin</option>
              <option value="author" ${user.roleName === 'author' ? 'selected' : ''}>author</option>
            </select>
            <button class="update-role-btn" data-user-id="${user.id}">Update</button>
          </div>
        </td>
      </tr>
    `).join('');

    dashboardContent.innerHTML = `
      <h3>Admin Panel - Manage Users</h3>
      <p class="section-note">Change any user's role using the dropdown and Update button.</p>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    // Wire up each Update button to call the admin role-change endpoint
    const updateButtons = document.querySelectorAll('.update-role-btn');
    updateButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const userId = button.getAttribute('data-user-id');
        const select = document.querySelector(`select.role-select[data-user-id="${userId}"]`);
        const newRoleName = select.value;

        await updateUserRole(userId, newRoleName);
      });
    });

  } catch (error) {
    dashboardContent.innerHTML = '<p class="empty-state">Error loading admin panel</p>';
  }
});

// Call PATCH /users/:userId/role as an admin
async function updateUserRole(userId, roleName) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roleName })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Reload the admin panel so the table refreshes
      adminPanelBtn.click();
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Error updating user role');
  }
}

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
// Admins see edit/delete buttons on EVERY post. Other logged-in users only
// see them on posts they authored.
function displayPosts(posts, container, showActionsForMyPosts) {
  if (posts.length === 0) {
    if (container === dashboardContent) {
      container.innerHTML += '<p class="empty-state">You have not created any posts yet.</p>';
    } else {
      container.innerHTML = '<p class="empty-state">No posts to display.</p>';
    }
    return;
  }

  const isAdmin = currentUser && currentUser.roleName === 'admin';

  const postsHTML = posts.map(post => {
    const createdDate = new Date(post.createdAt).toLocaleString();
    const isOwner = currentUser && post.author === currentUser.userId;

    // Show action buttons if:
    //   - this is the "My Posts" view (ownership guaranteed), OR
    //   - the current user is an admin (admins can edit/delete any post), OR
    //   - the current user owns this specific post
    const canEdit = showActionsForMyPosts || isAdmin || isOwner;

    const actions = canEdit ? `
      <div class="post-actions">
        <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
        <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
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

  // Show the role badge on the dashboard header
  const roleName = currentUser.roleName || 'unknown';
  userRoleInfo.innerHTML = `Role: <span class="role-badge role-${roleName}">${roleName}</span>`;

  // Only admins see the Admin Panel button
  if (roleName === 'admin') {
    adminPanelBtn.classList.remove('hidden');
  } else {
    adminPanelBtn.classList.add('hidden');
  }
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message show ${type}`;
  setTimeout(() => element.classList.remove('show'), 5000);
}

function handleAuthError(data) {
  alert(data.error);
  if (data.error.includes('expired') || data.error.includes('Invalid token')) {
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
