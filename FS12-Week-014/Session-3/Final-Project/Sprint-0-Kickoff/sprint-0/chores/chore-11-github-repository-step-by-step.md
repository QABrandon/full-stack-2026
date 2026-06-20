# Chore 11: Create GitHub Repository & Project Structure

ESTIMATED TIME: 15-20 minutes

## Overview

In this task, you will create a new GitHub repository, clone it to your local machine, and set up the basic folder structure for your full-stack application.

---

## Step 1: Create a New GitHub Repository

### 1.1 Navigate to GitHub

- Open your web browser and go to https://github.com
- Log in to your GitHub account

### 1.2 Create the Repository

- Click the green "New" button or the "+" icon in the top-right corner
- Select "New repository"

### 1.3 Configure Repository Settings

- Repository name: Choose a descriptive name (example: "task-manager-app")
- Description: Add a brief description (optional but recommended)
- Visibility: Select "Public"
- Check the box "Add a README file" (recommended)
- Check the box "Add .gitignore"
  - From the dropdown, select "Node"
- Leave "Choose a license" as None (or select one if you prefer)

### 1.4 Create the Repository

- Click the green "Create repository" button
- You should now see your new repository page

---

## Step 2: Clone Repository to Local Machine

### 2.1 Open the Repository in GitHub Desktop

- On your repository page, click the green "Code" button
- Select "Open with GitHub Desktop"
- Your browser may ask for permission to open GitHub Desktop - click "Allow" or "Open"

### 2.2 Choose Local Path in GitHub Desktop

- GitHub Desktop will open with a dialog box
- Choose where to save your project on your computer
  - Recommended: Create a dedicated folder for your projects (example: Documents/Projects/)
- Click "Clone"
- Wait for the cloning process to complete

### 2.3 Open in VS Code

- In GitHub Desktop, click "Open in Visual Studio Code" button
- OR click "Repository" menu, then "Open in Visual Studio Code"
- VS Code should open with your project folder

---

## Step 3: Verify Git Configuration

### 3.1 Open Terminal in VS Code

- In VS Code, open the integrated terminal:
  - Mac: Press `Ctrl + ~` or go to Terminal > New Terminal
  - Windows: Press `Ctrl + ~` or go to Terminal > New Terminal

### 3.2 Check Your Current Directory

- In the terminal, type:

```bash
pwd
```

**Expected Output:** You should see the full path to your project folder

```
/Users/yourname/Documents/Projects/task-manager-app
```

### 3.3 Verify Git is Working

- In the terminal, type:

```bash
git status
```

**Expected Output:** You should see something like:

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

If you see this message, Git is working correctly.

---

## Step 4: Update .gitignore File

### 4.1 Open .gitignore

- In VS Code, locate and open the `.gitignore` file in your project root

### 4.2 Verify Required Entries

- Check that the file includes these important entries:
  - `node_modules/` (should already be there from Node template)
  - `.env`
  - `.DS_Store` (for Mac users)

### 4.3 Add Missing Entries if Needed

- If `.env` is not in the file, add it on a new line
- If `.DS_Store` is not in the file, add it on a new line
- Save the file (Cmd+S on Mac, Ctrl+S on Windows)

---

## Step 5: Create Project Folder Structure

### 5.1 Create client Folder

- In the terminal, make sure you are in the project root directory
- Type:

```bash
mkdir client
```

### 5.2 Create server Folder

- In the terminal, type:

```bash
mkdir server
```

### 5.3 Verify Folders Were Created

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

You can also see these folders in the VS Code file explorer on the left side.

---

## Step 6: Commit and Push Your Changes

### 6.1 Check Git Status

- In the terminal, type:

```bash
git status
```

**Expected Output:** You should see the modified or new files listed in red

### 6.2 Stage All Changes

- In the terminal, type:

```bash
git add .
```

### 6.3 Commit Your Changes

- In the terminal, type:

```bash
git commit -m "Initialize project with gitignore"
```

**Expected Output:** You should see a confirmation message about files changed

### 6.4 Push to GitHub

- In the terminal, type:

```bash
git push
```

**Expected Output:** You should see messages about pushing to the remote repository

### 6.5 Verify on GitHub

- Go back to your repository page on GitHub in your browser
- Refresh the page
- You should now see the `client/` and `server/` folders

---

## Acceptance Criteria Checklist

Check off each item as you complete it:

- [ ] Repository exists on GitHub
- [ ] Local clone is working on your computer
- [ ] .gitignore includes `node_modules/`, `.env`, and `.DS_Store`
- [ ] `client/` folder created in project root
- [ ] `server/` folder created in project root
- [ ] Changes committed and pushed to GitHub (for gitignore only )
- [ ] `git status` shows "working tree clean"

---

## Project Structure

After completing this task, your project should look like this:

```
your-project/
├── client/         (React frontend)
├── server/         (Express backend)
├── .gitignore
└── README.md
```

---

## Next Steps

Once you have completed all the acceptance criteria, you are ready to move on to Setup Chore 2: Initialize React Frontend.
