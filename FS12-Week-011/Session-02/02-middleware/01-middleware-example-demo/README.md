# Middleware Example Demo

A simple Express.js application demonstrating middleware execution order and different types of middleware in action.

## Important: Port Conflict

**Before starting this demo, shut down any other servers running on port 3000.**

1. Stop other terminal sessions that might be running Express servers.

2. If step 1 doesn't work, check for running processes:
```bash
npx kill-port 3000
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node index.js
```

The server will run on `http://localhost:3000`

## Project Structure

```
middleware-example-demo/
├── index.js                   # Main server file with middleware examples
└── package.json
```

## API Endpoints

- `GET /users` - Get all users
- `POST /users` - Create a new user

## Middleware Execution Order

This demo shows middleware running in numbered order:

### 1. Server Startup
```
1. Server starting...
```

### 2. First Middleware (All Requests)
```javascript
app.use((req, res, next) => {
  console.log("2. First middleware - runs for ALL requests");
  next();
});
```

### 3. Second Middleware (All Requests)
```javascript
app.use((req, res, next) => {
  console.log("3. Second middleware - also runs for ALL requests");
  next();
});
```

### 4. Built-in Middleware
```javascript
app.use(express.json()); // Parses JSON request bodies
```

### 5. Route-Specific Middleware
```javascript
app.use("/users", (req, res, next) => {
  console.log("4. Users middleware - only for /users routes");
  next();
});
```

### 6. Route Handlers
```javascript
app.get("/users", (req, res) => {
  console.log("5. Route handler - GET /users");
  // Handle the request
});
```

## Testing the Demo

### 1. Start the Server
Run the server and watch console output:
```bash
node index.js
```

### 2. Test GET Request
Visit `http://localhost:3000/users` in your browser or use curl:
```bash
curl http://localhost:3000/users
```

Expected console output:
```
2. First middleware - runs for ALL requests
3. Second middleware - also runs for ALL requests
4. Users middleware - only for /users routes
5. Route handler - GET /users
```

### 3. Test POST Request
Use Postman or curl to send a POST request:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Charlie"}'
```

Expected console output:
```
2. First middleware - runs for ALL requests
3. Second middleware - also runs for ALL requests
4. Users middleware - only for /users routes
5. Route handler - POST /users
Request body: { name: 'Charlie' }
```

## Sample Request Body

Create User (POST /users):
```json
{
  "name": "Charlie"
}
```

## Key Learning Points

1. **Middleware Order**: Middleware executes in the exact order it's defined
2. **Global Middleware**: `app.use(middleware)` runs on all requests
3. **Route-Specific Middleware**: `app.use("/path", middleware)` runs only for specific routes
4. **Built-in Middleware**: Express provides middleware like `express.json()`
5. **Always Call next()**: Middleware must call `next()` to continue to the next middleware
6. **Console Logging**: Great way to visualize middleware execution flow

## Common Middleware Types

- **Logging**: Track all incoming requests
- **Authentication**: Verify user credentials
- **Parsing**: Handle JSON, form data, etc.
- **Validation**: Check request data
- **CORS**: Handle cross-origin requests
- **Error Handling**: Catch and process errors

## Notes

- Server runs on port 3000 (default Express port)
- Data is stored in-memory and resets when server restarts
- Numbered console logs help visualize middleware execution order
- Each middleware demonstrates a different concept or pattern