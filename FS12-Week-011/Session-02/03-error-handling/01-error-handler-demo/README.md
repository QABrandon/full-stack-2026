# Error Handler Demo

A simple Express.js application demonstrating error handling middleware with practical CRUD operations that trigger both validation (400) and server (500) errors.

## Important: Port Conflict

**Before starting this demo, shut down any other servers running on port 3600.**

1. Stop other terminal sessions that might be running Express servers.

2. If step 1 doesn't work, check for running processes:
```bash
npx kill-port 3600
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3600`

## Project Structure

```
error-handler-demo/
├── index.js                    # Main server with users routes
├── middleware/
│   └── errorHandler.js         # Error handling middleware
├── package.json
└── postman.json               # Test collection
```

## API Endpoints

- `GET /` - API documentation and available endpoints
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## Error Scenarios Demonstrated

### 400 Errors (Bad Request - Handled)
- **Missing name field**: POST without name in request body
- **Name too short**: POST with name less than 2 characters

### 500 Errors (Server Error - Unhandled)
- **Duplicate names**: Attempting to create users with existing names (Alice, Bob) causes intentional server crash
- **Unhandled exceptions**: Demonstrates what happens when errors aren't properly caught

## Testing with Postman

1. Import `postman.json` into Postman
2. Start the server (`npm start`)
3. Test in this order for best learning experience:

**Success Cases:**
- Get All Users (shows Alice and Bob)
- Create User with new name (e.g., "Charlie")
- Get User by ID (test with IDs 1, 2, 3)

**400 Error Cases:**
- Create User with missing name
- Create User with name too short

**500 Error Cases:**
- Create User with name "Alice" (duplicate)
- Create User with name "Bob" (duplicate)

## Sample Request Bodies

Create User (Success):
```json
{
  "name": "Charlie",
  "email": "charlie@example.com"
}
```

Create User (400 Error - Missing Name):
```json
{
  "email": "test@example.com"
}
```

Create User (500 Error - Duplicate):
```json
{
  "name": "Alice",
  "email": "alice2@example.com"
}
```

## Key Learning Points

- **Error Middleware Placement**: Must be defined after all routes
- **Error Middleware Signature**: Must have 4 parameters `(err, req, res, next)`
- **400 vs 500 Errors**: Difference between validation errors and server crashes
- **Error Response Format**: Consistent JSON error responses
- **Error Logging**: Console output for debugging

## Notes

- Data is stored in-memory and resets when server restarts
- Server runs on port 3600 to avoid conflicts
- Duplicate name detection intentionally causes crashes for demonstration
- Error handler catches and formats all errors consistently