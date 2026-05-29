# Custom Middleware Demo

A simple Express.js application demonstrating how to create and use custom middleware for request logging.

## Important: Port Conflict

**Before starting this demo, shut down any other servers running on port 3011.**

1. Stop other terminal sessions that might be running Express servers.

2. If step 1 doesn't work, check for running processes:
```bash
npx kill-port 3011
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

The server will run on `http://localhost:3011`

## Project Structure

```
custom-middleware-demo/
├── index.js                   # Main server file
├── middleware/
│   └── logger.js              # Custom logging middleware
└── package.json
```

## API Endpoints

- `GET /users` - Get all users with timestamp
- `GET /random` - Get random test data

## How Custom Middleware Works

### Creating Custom Middleware
```javascript
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // IMPORTANT: Always call next()
};
```

### Using Custom Middleware
```javascript
app.use(logger); // Apply to all routes
```

## Key Features Demonstrated

### Middleware Order
1. **Custom middleware first** (logger)
2. **Built-in middleware second** (express.json())
3. **Route handlers last**

### Middleware Function Signature
- **req**: Request object
- **res**: Response object
- **next**: Function to pass control to next middleware

### Request Logging
Every request logs:
- Timestamp (ISO format)
- HTTP method (GET, POST, etc.)
- Request URL

## Testing the Demo

### 1. Start the Server
Run `npm start` and watch the console for startup message.

### 2. Make Requests
Visit these URLs in your browser or use a tool like Postman:
- `http://localhost:3011/users`
- `http://localhost:3011/random`

### 3. Check Console Output
Watch your terminal for log messages like:
```
[2024-10-05T20:15:30.123Z] GET /users
[2024-10-05T20:15:35.456Z] GET /random
```

## Learning Points

1. **Custom middleware** allows you to run code before route handlers
2. **Middleware order matters** - they execute in the order they're defined
3. **Always call next()** to pass control to the next middleware
4. **Common use cases** include logging, authentication, validation
5. **Reusable modules** can be exported and imported across applications
