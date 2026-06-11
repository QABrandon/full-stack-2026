# Postman Collection Guide

This guide explains how to use the Postman collection to test the Blog API.

## Setup

### 1. Import the Collection

1. Open Postman
2. Click "Import" button
3. Select `Blog-API.postman_collection.json`
4. Collection will appear in your workspace

### 2. Start the Server

Make sure the server is running:
```bash
npm start
```

Server should be running on `http://localhost:3000`

## Collection Structure

The collection is organized into 4 folders:

### 1. Authentication
- Register User (Alice)
- Login User
- Register Second User (Bob)

### 2. Public Routes
- Get All Posts
- Get Single Post
- Get All Users

### 3. Protected Routes
- Create Post
- Get My Posts
- Get Profile
- Update Post (Own)
- Delete Post (Own)

### 4. Error Scenarios
- Create Post Without Token
- Login Invalid Credentials
- Register Duplicate Username

## How to Use

### Quick Start (Recommended Order)

Run the requests in this order for the best experience:

1. **Register User** - Creates Alice and saves token
2. **Create Post** - Creates a post (uses saved token)
3. **Get All Posts** - View all posts (public)
4. **Get My Posts** - View only Alice's posts
5. **Get Profile** - View Alice's profile
6. **Update Post** - Update Alice's post
7. **Register Second User (Bob)** - Create Bob's account
8. **Try to Update Post as Bob** - Should fail (ownership check)
9. **Delete Post** - Delete Alice's post

### Collection Variables

The collection uses variables to store data:

**Automatic Variables:**
- `authToken` - JWT token (saved after login/register)
- `postId` - Last created post ID (saved after create)

**Manual Variables:**
- `baseUrl` - API base URL (default: http://localhost:3000)

To view/edit variables:
1. Click on collection name
2. Go to "Variables" tab

### Authentication Flow

The collection automatically handles authentication:

1. Run "Register User" or "Login User"
2. Token is automatically saved to `authToken` variable
3. Protected routes automatically use this token
4. No manual token copying needed!

## Testing Scenarios

### Scenario 1: Happy Path

Test the complete user journey:

```
1. Register User (Alice)
   ✓ Status 201
   ✓ Token saved

2. Create Post
   ✓ Status 201
   ✓ Post ID saved

3. Get My Posts
   ✓ Status 200
   ✓ Shows Alice's posts

4. Update Post
   ✓ Status 200
   ✓ Post updated

5. Delete Post
   ✓ Status 200
   ✓ Post deleted
```

### Scenario 2: Resource Ownership

Test that users can only edit their own posts:

```
1. Register User (Alice)
   ✓ Creates Alice

2. Create Post (as Alice)
   ✓ Post created
   ✓ Post ID saved

3. Register Second User (Bob)
   ✓ Creates Bob
   ✓ Bob's token saved

4. Update Post (as Bob)
   ✗ Status 403
   ✗ Error: "You can only edit your own posts"
```

### Scenario 3: Error Handling

Test validation and errors:

```
1. Create Post Without Token
   ✗ Status 401
   ✗ Error: "Access token required"

2. Login Invalid Credentials
   ✗ Status 401
   ✗ Error: "Invalid credentials"

3. Register Duplicate Username
   ✗ Status 400
   ✗ Error: "Username already exists"
```

## Automated Tests

Each request includes automated tests:

### Register User Tests
```javascript
✓ Status code is 201
✓ Response has token and user
✓ Token is saved to collection variable
```

### Create Post Tests
```javascript
✓ Status code is 201
✓ Response has post object
✓ Post ID is saved to collection variable
```

### Update Post Tests
```javascript
✓ Status code is 200
✓ Post was updated
✓ Title includes "Updated"
```

### Error Tests
```javascript
✓ Status code is 401/403/400
✓ Error message is present
✓ Error message is descriptive
```

## Using Collection Variables

### View Current Values

```
Collection → Variables Tab

authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
postId: 1
baseUrl: http://localhost:3000
```

### Manually Set Token

If you need to manually set a token:

1. Get token from response
2. Go to Collection → Variables
3. Set `authToken` variable
4. Save

### Use Variables in Requests

Variables are already set up in requests:

```
URL: {{baseUrl}}/posts/{{postId}}
Auth: Bearer {{authToken}}
```

## Console Output

Each request logs useful information:

```javascript
// After Register/Login
Token saved: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// After Create Post
Post ID saved: 1
```

View console: Bottom of Postman → Console tab

## Runner

Run entire collection automatically:

1. Click collection name
2. Click "Run" button
3. Select requests to run
4. Click "Run Blog API"
5. View results

**Recommended Runner Order:**
- Authentication → Public Routes → Protected Routes → Error Scenarios

## Environment Setup (Optional)

Create environments for different servers:

**Development Environment:**
```
baseUrl: http://localhost:3000
```

**Production Environment:**
```
baseUrl: https://api.yourdomain.com
```

Switch environments using dropdown in top-right.

## Tips

### Reset Data
Server data resets when you restart:
```bash
# Stop server (Ctrl+C)
# Start server
npm start
```

### Clear Tokens
To start fresh:
1. Go to Variables
2. Clear `authToken`
3. Clear `postId`

### Testing Ownership
1. Register Alice
2. Create post as Alice (saves postId)
3. Register Bob (replaces authToken)
4. Try to update/delete Alice's post (should fail)

### Quick Testing
Use Collection Runner with delays:
1. Runner → Delay: 100ms
2. Select all requests
3. Run

## Common Issues

### Token Expired
**Error:** "Token expired. Please login again"
**Solution:** Run "Login User" again

### Post Not Found
**Error:** "Post not found"
**Solution:** Run "Create Post" to create a new post

### No Token
**Error:** "Access token required"
**Solution:** Run "Register User" or "Login User" first

### Server Not Running
**Error:** Connection refused
**Solution:** Run `npm start` in terminal

## Advanced Usage

### Custom Scripts

Add custom tests to any request:

```javascript
// Save username
pm.collectionVariables.set("username", jsonData.user.username);

// Check response time
pm.test("Response time < 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Validate schema
pm.test("Response schema is valid", function () {
    pm.expect(jsonData).to.have.all.keys('message', 'token', 'user');
});
```

### Pre-request Scripts

Run code before request:

```javascript
// Generate random username
pm.collectionVariables.set("randomUsername", "user" + Date.now());

// Log request
console.log("Making request to:", pm.request.url);
```

## Summary

This Postman collection provides:
- Complete API coverage
- Automatic token management
- Automated testing
- Error scenario testing
- Resource ownership validation
- Easy-to-follow structure

Perfect for learning, testing, and debugging the Blog API!
