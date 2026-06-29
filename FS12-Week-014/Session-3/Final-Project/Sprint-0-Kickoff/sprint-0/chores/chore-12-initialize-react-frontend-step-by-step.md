# Chore 12: Initialize React Frontend

ESTIMATED TIME: 15-20 minutes

## Overview

In this task, you will set up a React application with Vite, install routing and HTTP client libraries, set up your chosen styling framework and icons, and create a professional folder structure.

---

## Step 1: Verify You Are in the Correct Directory

### 1.1 Open Terminal in VS Code

- Make sure VS Code is open with your project
- Open the integrated terminal (Ctrl + ~ or Terminal > New Terminal)

### 1.2 Check Current Directory

- In the terminal, type:

```bash
pwd
```

**Expected Output:** You should see the path to your project root

```
/Users/yourname/Documents/Projects/task-manager-app
```

**Important:** You should be in the project ROOT, not inside client or server folders yet.

### 1.3 Verify Folder Structure

- In the terminal, type:

```bash
ls
```

**Expected Output:** You should see:

```
README.md
client
server
```

---

## Step 2: Create React Application with Vite

### 2.1 Run Vite Create Command

- In the terminal (while still in project root), type:

```bash
npm create vite@latest client -- --template react
```

**What this does:** Creates a new React project using Vite in the client folder

**Expected Output:**

```
Install with npm and start now?
Yes
```

```
These are the commands that are ran when you choose yes.

  cd client
  npm install
  npm run dev
```

### 2.2 Navigate to Client Folder

- In the terminal, type:

```bash
cd client
```

### 2.3 Visit the running frontend

- http://localhost:5173/

---

## Step 3: Install Core Dependencies

### 3.1 Install React Router

- In the terminal (in client folder), type:

```bash
npm install react-router
```

Note: If you can't type you may need to ctrl+c or cmd+c to close the running

**What each package does:**

- `react-router` - Handles client-side routing (navigation between pages)

**Expected Output:**

```
added 1 packages, and audited XXX packages in XXs
```

---

## Step 4: Install Styling Framework and Icons (from Planning Chore 6)

### 4.1 Install Your Chosen UI Framework

Based on your decision in Planning Chore 6, follow the installation instructions:

- **React Bootstrap:** https://react-bootstrap.github.io/docs/getting-started/introduction
- **Tailwind CSS:** https://tailwindcss.com/docs/guides/vite
- **DaisyUI:** https://daisyui.com/docs/install/
- **ShadCn:** https://ui.shadcn.com/docs/installation

**Note:** Follow the official documentation for your chosen framework. Each has specific setup steps for Vite.

### 4.2 Install Your Chosen Icon Library (if needed)

If you chose an icon library in Planning Chore 6, follow the installation instructions:

- **React Icons:** https://react-icons.github.io/react-icons/
- **Font Awesome:** https://docs.fontawesome.com/web/use-with/react/

---

## Step 5: Add Google Fonts (from Planning Chore 5)

### 5.1 Get Google Fonts Link (if using)

If you chose Google Fonts in Planning Chore 5:

- Go to https://fonts.google.com/
- Find your chosen font(s)
- Click "Select this style" for the weights you need
- Copy the `<link>` tag provided

### 5.2 Add to index.html

- In VS Code, open `client/index.html`
- Find the `<head>` section
- Paste the Google Fonts `<link>` tag before the closing `</head>` tag

Example:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + React</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Your+Font+Name:wght@400;700&display=swap"
    rel="stylesheet"
  />
</head>
```

### 5.3 Update CSS with Font Family

- Open `client/src/index.css`
- Add your font family at the top:

```css
body {
  font-family: "Your Font Name", sans-serif;
}
```

Save the file (Cmd+S on Mac, Ctrl+S on Windows)

---

## Step 6: Create Folder Structure

### 6.1 Navigate to src Folder

- In the terminal, type:

```bash
cd src
```

### 6.2 Create Project Folders

- In the terminal, type:

```bash
mkdir components pages hooks context utils
```

**What these folders are for:**

- `components/` - Reusable UI components
- `pages/` - Route-level page components
- `hooks/` - Custom React hooks
- `context/` - React Context for state management
- `utils/` - Helper functions

### 6.3 Verify Folders Were Created

- In the terminal, type:

```bash
ls
```

**Expected Output:** You should see:

```
App.css
App.jsx
assets
components
context
hooks
index.css
main.jsx
pages
utils
```

---

## Step 7: Test Your Setup

### 7.1 Navigate Back to Client Folder

- In the terminal, type:

```bash
cd ..
```

You should now be in the client folder.

### 7.2 Start the Development Server

- In the terminal, type:

```bash
npm run dev
```

**Expected Output:**

```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 7.3 Test in Browser

- Open your web browser
- Go to: `http://localhost:5173`

**Expected Result:** You should see the default Vite + React page with the Vite and React logos

### 7.4 Stop the Development Server

- Go back to the terminal
- Press `Ctrl + C` (works on both Mac and Windows)

**Expected Output:**

```
^C
```

The server should stop and you'll see your command prompt again.

---

## Folder Structure

After completing this task, your client folder should look like this:

```
client/
├── node_modules/
├── public/
├── src/
│   ├── components/    (Reusable UI components)
│   ├── pages/         (Route-level page components)
│   ├── hooks/         (Custom React hooks)
│   ├── context/       (React Context for state management)
│   ├── utils/         (Helper functions)
│   ├── assets/        (Images, icons, etc.)
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Acceptance Criteria Checklist

Check off each item as you complete it:

- [ ] React app created successfully with Vite
- [ ] react-router installed
- [ ] Styling framework/library installed (from Planning Chore 6)
- [ ] Icon library installed (if chosen in Planning Chore 6)
- [ ] Google Fonts added (if chosen in Planning Chore 5)
- [ ] All folders created (components, pages, hooks, context, utils)
- [ ] App runs without errors
- [ ] Default React page displays in browser at http://localhost:5173
- [ ] Commit client changes to git

## Next Steps

Once you have completed all the acceptance criteria, you are ready to move on to Setup Chore 13: Initialize Express Backend.
