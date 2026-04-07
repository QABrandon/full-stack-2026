# Merge Conflict Practice Guide

## Prerequisites (Before You Start)

**Required Knowledge:**
This guide assumes you understand the core concepts of Git as covered in:

- **Learn Git:** https://www.codecademy.com/learn/learn-git
- **Learn Git Branching and Collaboration:**
  - https://www.codecademy.com/learn/learn-git-branching-and-collaboration
  - https://docs.github.com/en/get-started/using-github/github-flow
- **Resolving Merge Conflicts in VS Code** https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts
- Install Node.js

**If you haven't completed these courses, pause here and finish them first.**

---

## What You'll Practice

In this exercise, you'll practice the real-world workflow of collaborating with Git:

- Setting up a shared repository
- Adding a collaborator
- Making commits back and forth
- Creating merge conflicts (on GitHub and locally)
- Resolving conflicts using VSCode
- Running tests to verify your code works after resolution
- The complete workflow from conflict to resolution

## Why Merge Conflicts Happen in Real Development

**Real-World Scenario:**
Imagine you and a teammate are both working on the same web application. You're adding a login feature while your teammate is adding a signup feature. Both of you need to modify the same navigation bar to add your new buttons. You both work on your own computers, make changes to the same file, and try to merge your code together. Git can't automatically decide which navigation bar is correct - that's a merge conflict.

**Common Situations That Cause Conflicts:**

1. **Feature Development:** Two developers add different features that modify the same component
2. **Bug Fixes:** One person fixes a bug while another refactors the same code
3. **Styling Updates:** Designers and developers change the same CSS styles simultaneously
4. **Code Reviews:** Someone updates code based on review feedback while another person continues development

**The Good News:**
Conflicts are a sign of active collaboration. They're not errors - they're Git asking "Hey, I see two different solutions here. Which one should we keep?"

---

## Video Overview (Recommended)

Watch this video for a visual walkthrough of merge conflict resolution:
[Add video URL here]

Then follow the step-by-step guide below.

---

## Part 1: Setup Repository and Add Collaborator

### Step 1: Create the Repository (Person A)

1. Go to GitHub and create a new repository
   - Name it `merge-conflict-practice`
   - Make it public
   - Do NOT add README, .gitignore, or license

2. Clone the repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/merge-conflict-practice.git
cd merge-conflict-practice
```

3. Copy the starter files from this folder into your repository:
   - Copy all files from `starter-files/` folder
   - Copy the `tests/` folder

4. Install dependencies and verify tests work:

```bash
npm install
npm test
```

You should see: "All tests passed"

5. Commit and push the starter files:

```bash
git add .
git commit -m "Add starter files and tests"
git push origin main
```

### Step 2: Add Collaborator (Person A)

1. On GitHub, go to your repository
2. Click Settings → Collaborators
3. Click "Add people"
4. Enter Person B's GitHub username
5. Person B will receive an email invitation

**Don't Have a Partner? Practice Solo:**

If you can't find a partner right now, you can still practice using branches to simulate two people:

1. Stay on the `main` branch (you're Person A)
2. When the guide says "Person B makes changes":
   - Create a branch: `git checkout -b person-b-feature`
   - Make Person B's changes
   - Commit on this branch
   - Switch back to main: `git checkout main`
3. Make Person A's changes on main
4. Merge the branch: `git merge person-b-feature`
5. Resolve the conflict just like you would in real collaboration

This simulates the exact same conflict scenarios you'd experience with a real partner.

### Step 3: Accept Invitation and Clone (Person B)

1. Check your email and accept the invitation
2. Clone the repository:

```bash
git clone https://github.com/PERSON-A-USERNAME/merge-conflict-practice.git
cd merge-conflict-practice
```

3. Install dependencies:

```bash
npm install
```

4. Run tests to verify everything works:

```bash
npm test
```

---

## Part 2: The Back-and-Forth Workflow

### Round 1: Creating Your First Conflict

**Real-World Context:**
You and your teammate are both working on personalizing the user greeting. Person A is implementing a feature to show the user's name, while Person B is adding time-based greetings (Good morning, Good evening). You both modify the same greeting variable without knowing the other person is also working on it.

**Person A - Make First Change:**

1. Open `starter-files/script.js`
2. Find the `greeting` variable
3. Change it to:

```javascript
const greeting = "Hello from Person A";
```

4. Run tests to make sure code works:

```bash
npm test
```

5. Commit and push:

```bash
git add .
git commit -m "Update greeting message"
git push origin main
```

---

**Person B - Pull Changes:**

1. Pull Person A's changes:

```bash
git pull origin main
```

2. Verify you see Person A's change in `script.js`
3. Run tests:

```bash
npm test
```

---

**Person B - Make Conflicting Change:**

1. Open `starter-files/script.js`
2. Change the SAME `greeting` variable to:

```javascript
const greeting = "Hello from Person B";
```

3. Run tests:

```bash
npm test
```

4. Commit and push:

```bash
git add .
git commit -m "Update greeting with my message"
git push origin main
```

---

**Person A - Try to Pull (Conflict Happens!):**

1. Try to pull Person B's changes:

```bash
git pull origin main
```

2. You'll see an error message like:

```
CONFLICT (content): Merge conflict in starter-files/script.js
Automatic merge failed; fix conflicts and then commit the result.
```

This is normal. This is a merge conflict.

---

## Part 3: Resolving Conflicts Locally with VSCode

### Understanding What Happened

Person A and Person B both changed the same line in the same file. Git doesn't know which change to keep, so it asks you to decide.

**Why Git Can't Automatically Merge:**

- Both changes touch the exact same line of code
- Git has no way to know which greeting feature is more important
- Automatic merging could break the application
- A human needs to decide: keep one version, keep both, or write a new solution

**In Professional Development:**
This happens constantly. Two developers working on different tickets might both need to update the same configuration file, the same function, or the same UI component. The conflict forces a conversation: "Hey, I see you changed this too. Let's figure out how to combine our work."

### Option 1: Using VSCode Merge Editor (Recommended)

1. Open VSCode in your project folder
2. You'll see `script.js` marked with a conflict indicator
3. Click on the file - you'll see a button "Resolve in Merge Editor"
4. Click that button

**Understanding the 3-Way Merge Editor:**

![VSCode Merge Editor](https://code.visualstudio.com/assets/docs/sourcecontrol/overview/merge-conflict.png)

The editor shows three panels:

- **Left (Incoming):** Changes from Person B (what you're trying to pull)
- **Right (Current):** Your changes (Person A's version)
- **Bottom (Result):** What the final file will look like

**Resolving Step-by-Step:**

1. Look at the conflict counter at the top (shows how many conflicts exist)
2. For each conflict, click one of the buttons:
   - **Accept Incoming:** Use Person B's version
   - **Accept Current:** Use Person A's version (yours)
   - **Accept Combination:** Use both changes
3. Watch the counter decrease as you resolve each conflict
4. Preview the result in the bottom panel
5. When the counter reaches 0, click "Complete Merge"

**Full Documentation:**
https://code.visualstudio.com/docs/sourcecontrol/overview#_3way-merge-editor

### Option 2: Manual Resolution (Understanding the Markers)

If you prefer to edit manually, open `script.js` and you'll see:

```javascript
<<<<<<< HEAD
const greeting = "Hello from Person A";
=======
const greeting = "Hello from Person B";
>>>>>>> incoming-change
```

**What this means:**

- `<<<<<<< HEAD` = Start of YOUR changes (Person A)
- `=======` = Divider between the two versions
- `>>>>>>> incoming-change` = End of THEIR changes (Person B)

**To resolve manually:**

1. Decide which version to keep (or write a new version)
2. Delete the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Keep only the code you want

Example resolution:

```javascript
const greeting = "Hello from Person A and Person B";
```

### Complete the Merge

After resolving (using either method):

1. Run tests to verify code works:

```bash
npm test
```

2. If tests pass, stage the resolved file:

```bash
git add starter-files/script.js
```

3. Commit the merge:

```bash
git commit -m "Resolve merge conflict in greeting message"
```

4. Push to GitHub:

```bash
git push origin main
```

5. Verify on GitHub that the conflict is resolved

---

## Part 4: Testing After Resolution

**Why Testing Matters:**
After resolving conflicts, your code might look correct but not actually work. Always run tests.

**Running Tests:**

```bash
npm test
```

**What the tests check:**

- HTML structure is valid
- JavaScript functions work correctly
- CSS is properly formatted
- No syntax errors

**If tests fail:**

1. Read the error message carefully
2. Fix the issue in the code
3. Run tests again
4. Commit and push once tests pass

---

## Part 5: Practice Rounds

### Round 2: CSS Conflict (Theme Feature)

**Real-World Context:**
The design team requested a theme update. Person B is implementing a "Dark Mode" theme while Person A is implementing a "Brand Refresh" with new company colors. You both modify the same header styling.

**Person B leads this round:**

1. Person B: Change the header background color in `styles.css` to `#1a1a1a` (dark theme)
2. Person B: Test, commit with message "Add dark mode header styling"
3. Person B: Push
4. Person A: Pull changes
5. Person A: Change the SAME header background color to `#0066cc` (brand blue)
6. Person A: Test, commit with message "Update header with new brand colors"
7. Person A: Push
8. Person B: Pull and resolve the conflict (decide which theme to use, or create a compromise)
9. Person B: Test, commit, push

### Round 3: HTML Conflict (Marketing Copy Update)

**Real-World Context:**
The marketing team needs updated page copy. Person A is updating text based on SEO recommendations, while Person B is implementing A/B testing variations. You both change the same heading.

**Person A leads this round:**

1. Person A: Change the h1 heading text in `index.html` to "Master Merge Conflicts - Learn Git Collaboration"
2. Person A: Test, commit with message "Update heading for SEO optimization"
3. Person A: Push
4. Person B: Pull changes
5. Person B: Change the SAME heading to "Welcome to Git Conflict Resolution Practice"
6. Person B: Test, commit with message "Add A/B test variation for heading"
7. Person B: Push
8. Person A: Pull and resolve the conflict
9. Person A: Test, commit, push

### Round 4: Multiline Function Conflict (Feature Enhancement)

**Real-World Context:**
You're both enhancing the greeting display feature. Person A is adding user name personalization, while Person B is adding timestamp functionality. Both features require modifying the same `displayGreeting()` function.

**Both people work simultaneously:**

1. Both: Pull latest changes
2. **Person A:** Modify the `displayGreeting()` function in `script.js`:

```javascript
function displayGreeting() {
  const greetingElement = document.getElementById("greeting-display");
  const userName = "Alex"; // Get from user profile

  if (greetingElement) {
    greetingElement.textContent = `${greeting}, ${userName}!`;
  }
}
```

3. **Person B:** Modify the SAME `displayGreeting()` function:

```javascript
function displayGreeting() {
  const greetingElement = document.getElementById("greeting-display");
  const currentTime = new Date().toLocaleTimeString();

  if (greetingElement) {
    greetingElement.textContent = `${greeting} - ${currentTime}`;
  }
}
```

4. Both: Test and commit locally (don't push yet)
5. Person A: Push first with message "Add user name personalization to greeting"
6. Person B: Try to pull - you'll see a MULTILINE conflict
7. Person B: Resolve the conflict by combining both features:

```javascript
function displayGreeting() {
  const greetingElement = document.getElementById("greeting-display");
  const userName = "Alex"; // Get from user profile
  const currentTime = new Date().toLocaleTimeString();

  if (greetingElement) {
    greetingElement.textContent = `${greeting}, ${userName}! - ${currentTime}`;
  }
}
```

8. Person B: Test, commit with message "Resolve conflict: combine user name and timestamp features"
9. Person B: Push

**What You Learned:**
Multiline conflicts require understanding what each person was trying to accomplish. The best resolution often combines both features rather than choosing one over the other.

### Round 5: Complex Multiline Conflict (Configuration Changes)

**Real-World Context:**
Both developers are updating the application configuration. Person A is adding analytics tracking, while Person B is adding error monitoring. Both need to add properties to the same configuration object.

**Setup:**

1. Both: Pull latest changes
2. Both: Open `starter-files/script.js` and find the bottom of the file
3. Both: Add a configuration object before the export statement

**Person A adds:**

```javascript
// Application configuration
const config = {
  appName: "Merge Conflict Practice",
  version: "1.0.0",
  analytics: {
    enabled: true,
    trackingId: "UA-12345678-1",
  },
};
```

**Person B adds (same location):**

```javascript
// Application configuration
const config = {
  appName: "Merge Conflict Practice",
  version: "1.0.0",
  errorMonitoring: {
    enabled: true,
    service: "Sentry",
    dsn: "https://example.com/sentry",
  },
};
```

4. Both: Commit locally
5. Person A: Push first with message "Add analytics configuration"
6. Person B: Try to pull - multiline conflict with overlapping object properties
7. Person B: Resolve by merging both configurations:

```javascript
// Application configuration
const config = {
  appName: "Merge Conflict Practice",
  version: "1.0.0",
  analytics: {
    enabled: true,
    trackingId: "UA-12345678-1",
  },
  errorMonitoring: {
    enabled: true,
    service: "Sentry",
    dsn: "https://example.com/sentry",
  },
};
```

8. Person B: Test, commit with message "Resolve conflict: combine analytics and error monitoring config"
9. Person B: Push

**Key Learning:**
Complex conflicts require careful reading of both versions. You need to understand the intent behind each change to merge them correctly. Communication with your teammate helps: "I see you added analytics. I added error monitoring. Let's keep both!"

---

## Part 6: When Conflicts Happen on GitHub

Sometimes you'll see conflicts directly on GitHub when trying to merge a pull request.

**What you'll see:**

- "This branch has conflicts that must be resolved"
- GitHub can't automatically merge

**What to do:**

1. Go to your local machine
2. Pull the latest changes from both branches
3. Resolve conflicts locally (using VSCode method above)
4. Test your code
5. Commit and push
6. GitHub will now allow the merge

---

## Part 7: The Complete Workflow (Quick Reference)

**Normal workflow (no conflicts):**

```
Pull → Edit → Test → Commit → Push → Repeat
```

**When conflict happens:**

```
Pull (conflict!) → Resolve in VSCode → Test → Commit → Push
```

**Commands to memorize:**

```bash
git pull origin main          # Get latest changes
npm test                      # Run tests
git add .                     # Stage changes
git commit -m "message"       # Commit changes
git push origin main          # Push to GitHub
```

**Conflict resolution checklist:**

- [ ] Pull and see the conflict
- [ ] Open in VSCode Merge Editor
- [ ] Resolve each conflict (counter reaches 0)
- [ ] Run tests (npm test)
- [ ] Stage resolved files (git add)
- [ ] Commit the merge
- [ ] Push to GitHub

---

## Part 8: Common Issues and Solutions

### "I'm stuck in a merge"

If you want to cancel the merge and start over:

```bash
git merge --abort
```

### "Tests are failing after resolution"

1. Check the error message from `npm test`
2. Open the file mentioned in the error
3. Fix the syntax or logic error
4. Run tests again
5. Commit and push when tests pass

### "I don't see conflict markers"

Make sure you:

1. Actually pulled the changes (`git pull origin main`)
2. Have conflicting changes in the same file
3. Are looking at the correct file

### "VSCode isn't showing the merge editor"

1. Make sure you have the latest version of VSCode
2. Try clicking on the file in the Source Control panel
3. Look for "Resolve in Merge Editor" button
4. If not available, use manual resolution method

---

## Key Takeaways

1. **Merge conflicts are normal** - They happen in professional development all the time, especially on active teams
2. **Conflicts = Collaboration** - They're a sign that multiple people are actively contributing, not a sign of failure
3. **Communication prevents conflicts** - Talk to your team about who's working on what files before starting work
4. **Always test after resolving** - Conflicts can break your code in subtle ways; automated tests catch issues
5. **VSCode makes it easier** - Use the visual merge editor to see changes clearly and make informed decisions
6. **Practice builds confidence** - The more you resolve conflicts, the easier they become
7. **Understand the intent** - Read both versions carefully to understand what each developer was trying to accomplish
8. **Multiline conflicts are common** - Real-world conflicts often span multiple lines; take your time to merge features correctly

**Real-World Impact:**

- Junior developers who can confidently resolve conflicts are more valuable to teams
- Understanding conflict resolution allows you to work on larger, more collaborative projects
- This skill is used daily in professional software development
- Team leads notice developers who resolve conflicts thoughtfully rather than arbitrarily choosing one version

---

## Next Steps: Further Learning

**Ready to level up your Git and GitHub skills?**

Now that you understand merge conflicts, take your collaboration skills to the next level:

**Learn GitHub Best Practices:** https://www.codecademy.com/learn/learn-github-best-practices
