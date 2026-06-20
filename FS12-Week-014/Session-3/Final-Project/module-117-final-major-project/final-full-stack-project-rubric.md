# Final Full Stack Project - Rubric

## Project Requirement

Build a full-stack application with **at least 1 real user** (ideally you) and the potential to easily reach 10 users.

**Tech Stack Required:** React + Express/Node + MongoDB or SQL

**Need help finding an idea?** See [Project Idea and User Discovery Guide](project-idea-and-user-discovery.md)

---

## Three Project Options (Choose One)

### Option 1: Task Management Platform

Build a task/project management app where users can organize work, track progress, and collaborate.

**Suggested Features:**

- Project boards with customizable columns
- Task cards with details (title, description, due date, priority)
- Assign tasks to team members
- Track progress visually
- Filter and sort tasks
- Activity timeline

**Example Use Case:** You and your study group track group project tasks, or you manage your personal projects.

---

### Option 2: Content Sharing Platform

Build a community platform where users can share content, interact, and discover posts from others.

**Suggested Features:**

- Create posts/articles with rich content
- Vote on posts (upvote/downvote)
- Comment on posts
- Organize content with categories/tags
- User profiles showing activity
- Feed with sorting (newest, popular, trending)
- Search functionality
- Content moderation tools

**Example Use Case:** Your class shares study resources and tips, or your hobby community shares projects.

---

### Option 3: Custom Project (Your Idea)

Build any application that solves a problem you or others have.

**Requirements:**

- Must include all technical requirements below
- Must have clear user value
- Must be something you would use yourself

**Example Ideas:**

- Recipe organizer for meal planning
- Habit tracker for you and friends
- Study scheduler for group coordination
- Budget tracker for roommate expenses
- Pet care tracker for vet visits and medication
- Workout logger with progress tracking
- Book/movie recommendation system

**Example Use Case:** You identified a real problem and built a tool to solve it.

---

## Technical Requirements (All Options)

### Full-Stack Architecture

- [ ] **Frontend:** React application
- [ ] **Backend:** Express with Node.js
- [ ] **Database:** MongoDB or SQL (PostgreSQL, MySQL, etc.)
- [ ] **Deployment:** Live, accessible URL

### Pages & Routing

- [ ] **Minimum 5 pages** with React Router:
  - Landing/Home page
  - Login page
  - Registration page
  - Dashboard/Main app page
  - User profile or settings page
- [ ] Navigation between all pages
- [ ] Protected routes (require login to access)

### Authentication & Authorization

- [ ] **User Registration** - Create new account with validation
- [ ] **User Login** - Authenticate with email/username and password
- [ ] **Password Security** - Hash passwords with bcrypt (minimum 10 salt rounds)
- [ ] **Session Management** - JWT tokens or sessions
- [ ] **Protected Routes** - Backend middleware protecting routes
- [ ] **Stay Logged In** - Users remain authenticated across sessions
- [ ] **Authorization** - Users can only access/modify their own data

### CRUD Operations

Must implement full CRUD for at least one main resource:

- [ ] **Create** - Users can add new items/content
- [ ] **Read** - Users can view their items/content
- [ ] **Update** - Users can edit their items/content
- [ ] **Delete** - Users can remove their items/content

### Database

- [ ] **Minimum 2 schemas/models** with relationships
- [ ] **Data validation** on schema level
- [ ] **Proper data types** for all fields
- [ ] **Relationships** between collections/tables (foreign keys or references)

### API Design

- [ ] **RESTful API** with proper HTTP methods (GET, POST, PUT, DELETE)
- [ ] **Minimum 5-6 endpoints** with at least 2 routes covering authentication + CRUD operations
- [ ] **Request validation** - Validate all inputs on backend
- [ ] **Error handling** - Try-catch blocks and proper error responses
- [ ] **Proper status codes** (200, 201, 400, 401, 403, 404, 500)

### Security

- [ ] **Environment variables** - .env file for secrets (not committed)
- [ ] **.env.example** - Template showing required variables
- [ ] **Password hashing** - bcrypt with minimum 10 salt rounds
- [ ] **CORS configuration** - Proper CORS setup between frontend and backend
- [ ] **Helmet.js** - Security headers configured
- [ ] **Input sanitization** - Sanitize and validate all user inputs before database operations
- [ ] **SQL injection prevention** - Use parameterized queries or ORM (Mongoose/Sequelize)
- [ ] **XSS prevention** - Escape output and sanitize HTML content
- [ ] **Rate limiting** - Limit authentication attempts to prevent brute force attacks
- [ ] **Token expiration** - JWT tokens have appropriate expiration times
- [ ] **HTTPS in production** - Secure communication for deployed application
- [ ] **No secrets in code** - API keys and passwords not committed to repository

### User Experience

- [ ] **Responsive design** - Works on mobile, tablet, and desktop
- [ ] **Loading states** - Show loading indicators during async operations
- [ ] **Error messages** - Display user-friendly errors
- [ ] **Form validation** - Client-side validation with error messages
- [ ] **Success feedback** - Confirm successful actions to users

### Code Quality

- [ ] **Organized structure** - Clear separation of frontend/backend
  ```
  project/
  ├── client/         (React frontend)
  ├── server/         (Express backend)
  └── README.md
  ```
- [ ] **Clean code** - Readable with consistent formatting
- [ ] **Error handling** - Graceful handling of errors
- [ ] **Git commits** - Regular commits with meaningful messages

---

## Documentation Requirements

### README.md

Must include:

- [ ] **Project description** - What the app does and why
- [ ] **Tech stack** - List of technologies used
- [ ] **Installation instructions** - Step-by-step setup for developers
  - Clone repository
  - Install dependencies (client and server)
  - Set up environment variables
  - Database setup
  - Run the application
- [ ] **Environment variables** - List of required .env variables
- [ ] **Features list** - Main functionality
- [ ] **Screenshots** - At least 3 screenshots of the app
- [ ] **Live URL** - Link to deployed application
- [ ] **Known issues** - Any bugs or limitations (optional)

### Demo Video (3-5 minutes)

Must show:

- [ ] **Overview** - Quick intro of what the app does
- [ ] **Key features** - Demonstrate main functionality
- [ ] **User flow** - Show registration, login, and core features
- [ ] **Real usage** - Explain how you or others use it

---

## Submission Checklist

### Required Files

- [ ] GitHub repository with complete source code
- [ ] README.md with all required sections
- [ ] .env.example file (no actual secrets)
- [ ] Demo video (3-5 minutes)

### Required Links

- [ ] GitHub repository URL
- [ ] Live deployment URL
- [ ] Demo video URL (YouTube, Loom, or similar)

### Before Submitting

- [ ] Application is deployed and accessible
- [ ] All features work without critical bugs
- [ ] At least 1 real user (you or someone else) has used it
- [ ] README has clear setup instructions
- [ ] No .env file or secrets committed to Git
- [ ] Demo video shows working application

---

## Suggested Feature Scope by Option

### Option 1: Task Management - Minimum Features

- User auth (register, login)
- Create/edit/delete tasks
- Mark tasks complete
- Organize tasks by project or category
- Due dates and priorities

**Add if time:**

- Assign tasks to other users
- Progress visualization
- Activity feed
- Notifications

### Option 2: Content Sharing - Minimum Features

- User auth (register, login)
- Create/edit/delete posts
- Vote on posts
- Comment on posts
- User profiles

**Add if time:**

- Categories/tags
- Search functionality
- Nested comments
- Moderator roles

### Option 3: Custom - Minimum Features

Whatever makes sense for your specific problem, but must include:

- User auth
- At least one resource with full CRUD
- Multi-page navigation
- Something users genuinely need

---

## FAQ

**Q: Do I need to get 10 users?**
A: No, minimum is 1 real user (can be you). But it should be feasible to get 10 if needed.

**Q: Can I work with a partner?**
A: Yes, just make sure the scope is large enough that you both can do full stack work.

**Q: Does my instructor count as a user?**
A: No, the user should be someone who genuinely needs the app.

**Q: Can all my users be friends/family?**
A: Yes, if they genuinely use the app. No, if they're just helping you pass.

**Q: What if my idea is too big?**
A: Start with MVP (minimum viable product). Ship simple version first, add features later.

**Q: What if my project is supposed to be local only?**
A: That isn't a problem. In that case you will probably want to use SQLite and Sequelize for your project and skip deployment. Ask your instructor if it makes sense for your project.

**Q: How do I find a good project idea?**
A: Read the [Project Idea and User Discovery Guide](project-idea-and-user-discovery.md) for strategies on identifying pain points, validating ideas, and finding your first users.

---

## Deployment Resources

### Frontend Deployment

- **Render** - Easiest for React apps (free tier)

### Backend + Database Deployment

- **Render** - Deploy Express + MongoDB together (free tier)

### Database Hosting

- **MongoDB Atlas** - Cloud MongoDB (free tier)
- **Supabase** - Cloud PostgreSQL (free tier)

---

**Due Date:** End of Bootcamp or you decide

**Submit to:** #project-showcase channel with:

1. GitHub repository link
2. Live deployment URL
3. Demo video link
