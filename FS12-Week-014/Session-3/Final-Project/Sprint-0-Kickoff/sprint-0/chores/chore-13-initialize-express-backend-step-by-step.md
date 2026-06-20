# Chore 13: Initialize Express Backend with Folder Structure

ESTIMATED TIME: 15 minutes

## Overview

In this task, you will set up an Express server, install all necessary dependencies, create the folder structure, configure environment variables, and test your server with a basic route.

---

## Step 1: Navigate to Server Folder

### 1.1 Check Current Directory

- Open terminal in VS Code
- Type:

```bash
pwd
```

**If you are in the client folder**, you will see:

```
/Users/yourname/Documents/Projects/task-manager-app/client
```

**If you are in the client folder**, you need to go back to the project root:

```bash
cd ..
```

### 1.2 Verify You Are in Project Root

- Type:

```bash
pwd
```

**Expected Output:**

```
/Users/yourname/Documents/Projects/task-manager-app
```

### 1.3 Navigate to Server Folder

- Type:

```bash
cd server
```

### 1.4 Confirm You Are in Server Folder

- Type:

```bash
pwd
```

**Expected Output:**

```
/Users/yourname/Documents/Projects/task-manager-app/server
```

The path should end with `/server`

---

## Step 2: Initialize npm Project

### 2.1 Create package.json

- In the terminal (in server folder), type:

```bash
npm init -y
```

**What this does:** Creates a `package.json` file with default settings

**Expected Output:**

```
Wrote to /path/to/project/server/package.json:

{
  "name": "server",
  "version": "1.0.0",
  ...
}
```

### 2.2 Verify package.json Was Created

- Type:

```bash
ls
```

**Expected Output:** You should see:

```
package.json
```

---

## Step 3: Install Core Backend Dependencies

### 3.1 Install Main Dependencies

- In the terminal, type:

```bash
npm install express dotenv cors bcrypt jsonwebtoken
```

**What each package does:**

- `express` - Web framework for building the server
- `dotenv` - Loads environment variables from .env file
- `cors` - Enables Cross-Origin Resource Sharing (allows frontend to talk to backend)
- `bcrypt` - Hashes passwords securely
- `jsonwebtoken` - Creates and verifies authentication tokens

**Expected Output:** Installation progress, then:

```
added XX packages, and audited XX packages in XXs
```

This may take 30-60 seconds.

---

## Step 4: Install Security Dependencies

### 4.1 Install Security Packages

- In the terminal, type:

```bash
npm install helmet express-rate-limit
```

**What each package does:**

- `helmet` - Sets secure HTTP headers
- `express-rate-limit` - Prevents brute-force attacks by limiting requests

**Expected Output:**

```
added 3 packages, and audited XX packages in XXs
```

---

## Step 5: DB Install is done as Chore 14

---

## Step 6: Install Development Dependencies

### 6.1 Install Nodemon

- In the terminal, type:

```bash
npm install --save-dev nodemon
```

**What this does:** Installs nodemon as a development dependency. Nodemon automatically restarts your server when you make code changes.

**Expected Output:**

```
added 27 package, and audited XX packages in XXs
```

---

## Step 7: Update package.json Scripts

### 7.1 Open package.json

- In VS Code, open `server/package.json`

### 7.2 Find the Scripts Section

- Locate the `"scripts"` section (around line 6)
- It currently looks like:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

### 7.3 Add Start and Dev Scripts

- Replace the scripts section with:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

**What these scripts do:**

- `start` - Runs the server normally (for production)
- `dev` - Runs the server with nodemon (for development)

### 7.4 Save the File

- Press Cmd+S (Mac) or Ctrl+S (Windows)

---

## Step 8: Create Folder Structure

### 8.1 Create Required Folders

- In the terminal (still in server folder), type:

```bash
mkdir models routes middleware config controllers utils
```

**What this creates:** Six folders for organizing your code

- `models/` - Database schemas/models
- `controllers/` - Business logic for routes
- `routes/` - API route handlers
- `middleware/` - Authentication, validation, error handling
- `config/` - Database connection, config files
- `utils/` - Helper functions, validators, token generators

### 8.2 Verify Folders Were Created

- Type:

```bash
ls
```

**Expected Output:**

```
config
controllers
middleware
models
node_modules
package-lock.json
package.json
routes
utils
```

---

## Step 9: Create Environment Variables File

### 9.1 Create .env File

- In the terminal, type:

```bash
touch .env
```

### 9.2 Open .env File

- In VS Code, open `server/.env`

### 9.3 Add Environment Variables

- Add the following content:

```
PORT=3001
NODE_ENV=development
DATABASE_URL=temporary_placeholder
JWT_SECRET=temporary_placeholder
```

**Important:** These are temporary placeholder values. You will update them later when you set up your actual database and authentication.

### 9.4 Save the File

- Press Cmd+S (Mac) or Ctrl+S (Windows)

---

## Step 10: Create .env.example File

### 10.1 Create .env.example File

- In the terminal, type:

```bash
touch .env.example
```

### 10.2 Open .env.example File

- In VS Code, open `server/.env.example`

### 10.3 Add Template Content

- Add the following content (notice there are NO actual values, just placeholders):

```
PORT=3001
NODE_ENV=development
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_here
```

**What this file is for:** This is a template showing what environment variables are needed. It gets committed to Git (unlike .env which stays private).

### 10.4 Save the File

- Press Cmd+S (Mac) or Ctrl+S (Windows)

---

## Step 11: Create server.js with Test Route

### 11.1 Create server.js File

- In the terminal, type:

```bash
touch server.js
```

### 11.2 Open server.js File

- In VS Code, open `server/server.js`

### 11.3 Add Basic Server Code

- Copy and paste the following code:

```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 11.4 Save the File

- Press Cmd+S (Mac) or Ctrl+S (Windows)

---

## Step 12: Test Your Server

### 12.1 Start the Development Server

- In the terminal (in server folder), type:

```bash
npm run dev
```

**Expected Output:**

```
[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
Server running on port 3001
```

If you see this, your server is running successfully!

### 12.2 Test the Route in Browser

- Open your web browser
- Go to: `http://localhost:3001/api/test`

**Expected Result:** You should see JSON output like:

```json
{
  "message": "Backend is working!"
}
```

### 12.3 Test the Route in Terminal (Alternative)

- Open a NEW terminal window (keep the server running in the first one)
- Type:

```bash
curl http://localhost:3001/api/test
```

**Expected Output:** Same JSON response as above

---

## Step 13: Stop the Development Server

### 13.1 Stop the Server

- Go back to the terminal where the server is running
- Press `Ctrl + C` (works on both Mac and Windows)

**Expected Output:**

```
[nodemon] clean exit - waiting for changes before restart
^C
```

The server should stop and you'll see your command prompt again.

---

## Acceptance Criteria Checklist

Check off each item as you complete it:

- [ ] package.json created in server folder
- [ ] All core dependencies installed (express, dotenv, cors, bcrypt, jsonwebtoken)
- [ ] All security dependencies installed (helmet, express-rate-limit)
- [ ] nodemon installed as dev dependency
- [ ] Scripts added to package.json (start and dev)
- [ ] All folders created (models, controllers, routes, middleware, config, utils)
- [ ] .env file created with PORT, NODE_ENV, DATABASE_URL, JWT_SECRET
- [ ] .env.example file created with template values
- [ ] server.js created with test route
- [ ] Server runs successfully on port 3001 (npm run dev works)
- [ ] Test route returns JSON response at http://localhost:3001/api/test
- [ ] Server stops correctly with Ctrl+C
- [ ] Commit your backend skeleton to git repo

## Understanding Your Server Structure

After completing this task, your server folder should look like this:

```
server/
├── node_modules/          # All installed packages
├── config/                # Configuration files (empty for now)
├── controllers/           # Business logic for routes (empty for now)
├── middleware/            # Custom middleware (empty for now)
├── models/                # Database models (empty for now)
├── routes/                # API routes (empty for now)
├── utils/                 # Helper functions (empty for now)
├── .env                   # Environment variables (SECRET - not in Git)
├── .env.example           # Environment template (safe for Git)
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
└── server.js              # Main server file
```

---
