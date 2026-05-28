# Express Routes Controllers Demo

Express routing organized with separate routes and controllers following MVC pattern

## Setup

```bash
npm install
node index.js
```

Server runs on http://localhost:3000

## Using the Postman Collection

1. Open Postman and go to File > Import

2. Drop the Postman collection onto the "Drop anywhere to import" screen
   Collection file location: `../Express-Routing-Demo.postman_collection.json`

3. The collection includes 8 requests that work with this refactored version:
   - GET All Users
   - Create User
   - Get User by ID (users 1 and 2)
   - Update User
   - Delete User
   - Error tests (user not found, missing data)

4. Start the server first, then click any request and hit "Send" to test the endpoints

## Debugging in VS Code

1. Open any file (index.js, routes, or controllers) and click the left margin to add breakpoints

2. Open package.json in VS Code

3. Look for the floating "Debug" button that appears above the scripts section

4. Click "Debug" to start the debugger

5. Make requests using Postman and the debugger will pause at your breakpoints
