// JWT Authentication Frontend Application

// API base URL
const API_URL = 'http://localhost:3000';

// Store the JWT token in memory
let authToken = null;

// Get DOM elements
const authSection = document.getElementById('auth-section');
const protectedSection = document.getElementById('protected-section');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const authMessage = document.getElementById('auth-message');
const usernameDisplay = document.getElementById('username-display');
const protectedContent = document.getElementById('protected-content');
const tokenDisplay = document.getElementById('token-display');
const responseMessage = document.getElementById('response-message');
const getProfileBtn = document.getElementById('get-profile-btn');
const getDashboardBtn = document.getElementById('get-dashboard-btn');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
  // Try to get token from localStorage
  const savedToken = localStorage.getItem('authToken');

  if (savedToken) {
    authToken = savedToken;
    showProtectedSection();
  }
});

// Signup form submission handler
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the form input values
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  try {
    // Make POST request to signup endpoint
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Signup successful
      showMessage(authMessage, `Account created for ${data.username}! Please login.`, 'success');
      signupForm.reset();
    } else {
      // Signup failed
      showMessage(authMessage, data.message, 'error');
    }

  } catch (error) {
    showMessage(authMessage, 'Network error. Make sure the server is running.', 'error');
    console.error('Signup error:', error);
  }
});

// Login form submission handler
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the form input values
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    // Make POST request to login endpoint
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Login successful - store the token
      authToken = data.token;

      // Save token to localStorage so it persists across page refreshes
      localStorage.setItem('authToken', authToken);

      // Show success message
      showMessage(authMessage, data.message, 'success');

      // Display the protected section
      showProtectedSection(data.user.username);

      // Clear the login form
      loginForm.reset();

      // Display the token
      displayToken(authToken);

      // Show response in message box
      displayResponse(data);

    } else {
      // Login failed
      showMessage(authMessage, data.message, 'error');
    }

  } catch (error) {
    showMessage(authMessage, 'Network error. Make sure the server is running.', 'error');
    console.error('Login error:', error);
  }
});

// Get profile button handler
getProfileBtn.addEventListener('click', async () => {
  try {
    // Make GET request to protected profile endpoint with JWT token
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Display the profile data
      protectedContent.innerHTML = `
        <h4>Profile Data:</h4>
        <p><strong>User ID:</strong> ${data.user.userId}</p>
        <p><strong>Username:</strong> ${data.user.username}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `;
      displayResponse(data);
    } else {
      // Handle token errors
      handleTokenError(data);
    }

  } catch (error) {
    protectedContent.innerHTML = '<p class="error">Network error loading profile.</p>';
    console.error('Profile error:', error);
  }
});

// Get dashboard button handler
getDashboardBtn.addEventListener('click', async () => {
  try {
    // Make GET request to protected dashboard endpoint with JWT token
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Display the dashboard data
      protectedContent.innerHTML = `
        <h4>Dashboard Data:</h4>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p><strong>Protected Data:</strong> ${data.data}</p>
      `;
      displayResponse(data);
    } else {
      // Handle token errors
      handleTokenError(data);
    }

  } catch (error) {
    protectedContent.innerHTML = '<p class="error">Network error loading dashboard.</p>';
    console.error('Dashboard error:', error);
  }
});

// Logout button handler
logoutBtn.addEventListener('click', () => {
  // Clear the token from memory and localStorage
  authToken = null;
  localStorage.removeItem('authToken');

  // Hide protected section and show auth section
  protectedSection.classList.add('hidden');
  authSection.classList.remove('hidden');

  // Clear content
  protectedContent.innerHTML = '';
  tokenDisplay.innerHTML = '';
  responseMessage.textContent = '';

  // Show logout message
  showMessage(authMessage, 'Logged out successfully', 'success');
});

// Helper function to show messages
function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `message show ${type}`;

  // Hide message after 5 seconds
  setTimeout(() => {
    element.classList.remove('show');
  }, 5000);
}

// Helper function to show protected section
function showProtectedSection(username) {
  // If username is not provided, try to decode it from the token
  if (!username && authToken) {
    // Decode the JWT payload (middle part of token)
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    username = payload.username;
  }

  // Update username display
  usernameDisplay.textContent = username || 'User';

  // Hide auth section and show protected section
  authSection.classList.add('hidden');
  protectedSection.classList.remove('hidden');
}

// Helper function to display the JWT token
function displayToken(token) {
  // Split token into parts for better display
  const parts = token.split('.');

  tokenDisplay.innerHTML = `
    <strong>Your JWT Token:</strong><br>
    <small>Header:</small> ${parts[0]}<br>
    <small>Payload:</small> ${parts[1]}<br>
    <small>Signature:</small> ${parts[2]}
  `;
}

// Helper function to display API responses
function displayResponse(data) {
  responseMessage.textContent = JSON.stringify(data, null, 2);
}

// Helper function to handle token errors
function handleTokenError(data) {
  protectedContent.innerHTML = `<p class="error">${data.message}</p>`;
  displayResponse(data);

  // If token expired or invalid, prompt user to login again
  if (data.message.includes('expired') || data.message.includes('Invalid')) {
    setTimeout(() => {
      logoutBtn.click();
    }, 2000);
  }
}
