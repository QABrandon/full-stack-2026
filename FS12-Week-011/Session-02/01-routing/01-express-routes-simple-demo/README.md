# Express Routes Simple Demo

Basic Express routing with routes defined directly in index.js

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

3. The collection includes 8 requests:
   - GET All Users
   - Create User
   - Get User by ID (users 1 and 2)
   - Update User
   - Delete User
   - Error tests (user not found, missing data)

4. Start the server first, then click any request and hit "Send" to test the endpoints

## Debugging in VS Code

1. Open index.js and click the left margin to add breakpoints on any line

2. Open package.json in VS Code

3. Look for the floating "Debug" button that appears above the scripts section

4. Click "Debug" to start the debugger

5. Make requests using Postman and the debugger will pause at your breakpoints
