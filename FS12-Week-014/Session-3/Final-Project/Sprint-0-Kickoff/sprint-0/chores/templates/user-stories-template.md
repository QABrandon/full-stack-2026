# User Stories Template

Use this template to create user stories for your final project. Each story should follow the format below with clear acceptance criteria and time estimates.

---

## User Story Format

```
Story #: [Story Title]

As a [user type],
I want to [action],
So that [benefit/value].

Acceptance Criteria:
- [ ] Criterion 1 (specific, testable)
- [ ] Criterion 2 (specific, testable)
- [ ] Criterion 3 (specific, testable)

Priority: [High/Medium/Low]
Sprint: [1 or 2]
Estimated Time: [X hours]
Status: [Not Started/In Progress/Complete]
```

---

## Required User Stories (Authentication & Core Features)

### Story 0: Connect Database to Backend (Chore/Setup Story)

**This is a technical setup story that enables all other backend stories.**

As a developer,
I want to connect the database to the Express server,
So that I can store and retrieve data for the application.

Acceptance Criteria:
- [ ] Server.js imports Mongoose or Sequelize
- [ ] Database connection string loaded from .env
- [ ] Connection established when server starts
- [ ] Success message logged to console on connection
- [ ] Error handling if connection fails
- [ ] Server does not start if database connection fails

Priority: Critical (Must be done first in Sprint 1)
Sprint: 1
Estimated Time: 30 minutes
Status: Not Started

---

### Story 1: User Registration

As a new user,
I want to create an account with email and password,
So that I can securely access the application.

Acceptance Criteria:
- [ ] User can enter email, username, and password in registration form
- [ ] Email format is validated (must contain @ and domain)
- [ ] Username is validated (3-20 characters, alphanumeric)
- [ ] Password is validated (minimum 8 characters)
- [ ] Password is hashed with bcrypt (10+ salt rounds) before saving
- [ ] User receives clear success message after registration
- [ ] User is redirected to login page after successful registration
- [ ] Duplicate email/username shows appropriate error message

Priority: High
Sprint: 1 (Backend) & 2 (Frontend)
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 2: User Login

As a registered user,
I want to log in with my credentials,
So that I can access my personal data and use the application.

Acceptance Criteria:
- [ ] User can enter email/username and password
- [ ] Credentials are validated against database
- [ ] Password is compared using bcrypt
- [ ] JWT token is generated and returned on successful login
- [ ] Token is stored in localStorage on frontend
- [ ] User is redirected to dashboard after successful login
- [ ] Invalid credentials show clear error message
- [ ] User remains logged in across browser sessions

Priority: High
Sprint: 1 (Backend) & 2 (Frontend)
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 3: Protected Routes (Backend)

As the system,
I want to verify user authentication on protected routes,
So that only authenticated users can access their data.

Acceptance Criteria:
- [ ] Authentication middleware checks for valid JWT token
- [ ] Middleware extracts user ID from token
- [ ] Middleware attaches user data to request object
- [ ] Routes return 401 if token is missing or invalid
- [ ] Routes return 403 if user lacks authorization
- [ ] Token expiration is checked and enforced

Priority: High
Sprint: 1
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 4: Protected Routes (Frontend)

As a user,
I want to be automatically redirected to login if I'm not authenticated,
So that my data remains secure.

Acceptance Criteria:
- [ ] ProtectedRoute component checks for JWT token in localStorage
- [ ] User is redirected to login page if no token exists
- [ ] User is redirected to login page if token is expired/invalid
- [ ] Protected pages (Dashboard, Profile) only accessible when logged in
- [ ] Navigation links show/hide based on auth status
- [ ] User can access protected routes after successful login

Priority: High
Sprint: 2
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 5: Create [Resource] (Backend)

As an authenticated user,
I want to create a new [task/post/recipe/etc.],
So that I can add items to my collection.

Acceptance Criteria:
- [ ] POST /api/[resource] route accepts authenticated requests
- [ ] Request body is validated (all required fields present)
- [ ] User ID from token is associated with new resource
- [ ] Resource is saved to database with validation
- [ ] 201 status code returned with created resource
- [ ] Error messages returned for validation failures
- [ ] Resource is only accessible by the creating user

Priority: High
Sprint: 1
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 6: Read [Resources] (Backend)

As an authenticated user,
I want to retrieve all my [tasks/posts/recipes/etc.],
So that I can view my collection.

Acceptance Criteria:
- [ ] GET /api/[resource] route accepts authenticated requests
- [ ] Only resources belonging to authenticated user are returned
- [ ] Resources are returned in consistent order (newest first or by priority)
- [ ] Empty array returned if user has no resources
- [ ] 200 status code returned with array of resources
- [ ] Related data is populated if needed (e.g., user details)

Priority: High
Sprint: 1
Estimated Time: 1-2 hours
Status: Not Started

---

### Story 7: Update [Resource] (Backend)

As an authenticated user,
I want to update one of my [tasks/posts/recipes/etc.],
So that I can modify information when needed.

Acceptance Criteria:
- [ ] PUT /api/[resource]/:id route accepts authenticated requests
- [ ] User can only update their own resources (authorization check)
- [ ] Request body is validated
- [ ] Resource is found and updated in database
- [ ] 200 status code returned with updated resource
- [ ] 404 returned if resource doesn't exist
- [ ] 403 returned if user doesn't own the resource

Priority: High
Sprint: 1
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 8: Delete [Resource] (Backend)

As an authenticated user,
I want to delete one of my [tasks/posts/recipes/etc.],
So that I can remove items I no longer need.

Acceptance Criteria:
- [ ] DELETE /api/[resource]/:id route accepts authenticated requests
- [ ] User can only delete their own resources (authorization check)
- [ ] Resource is found and deleted from database
- [ ] 200 status code returned with success message
- [ ] 404 returned if resource doesn't exist
- [ ] 403 returned if user doesn't own the resource

Priority: High
Sprint: 1
Estimated Time: 1-2 hours
Status: Not Started

---

### Story 9: Display [Resources] List (Frontend)

As a user,
I want to see all my [tasks/posts/recipes/etc.] on my dashboard,
So that I can view my collection at a glance.

Acceptance Criteria:
- [ ] Dashboard page fetches resources from API on load
- [ ] Loading indicator shown while fetching data
- [ ] Resources displayed in cards/list format
- [ ] Empty state message shown if no resources exist
- [ ] Error message shown if fetch fails
- [ ] Page is responsive (works on mobile, tablet, desktop)

Priority: High
Sprint: 2
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 10: Create [Resource] Form (Frontend)

As a user,
I want to fill out a form to create a new [task/post/recipe/etc.],
So that I can easily add items to my collection.

Acceptance Criteria:
- [ ] Form includes all required fields with labels
- [ ] Client-side validation provides immediate feedback
- [ ] Form submits data to POST /api/[resource] endpoint
- [ ] Loading state shown during submission
- [ ] Success message displayed after creation
- [ ] User sees new resource in list immediately
- [ ] Form resets or closes after successful submission
- [ ] Error messages shown for validation failures

Priority: High
Sprint: 2
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 11: Update [Resource] Form (Frontend)

As a user,
I want to edit one of my [tasks/posts/recipes/etc.],
So that I can update information when it changes.

Acceptance Criteria:
- [ ] Edit button/link available on each resource
- [ ] Form pre-populates with existing data
- [ ] User can modify fields and submit changes
- [ ] Form submits to PUT /api/[resource]/:id endpoint
- [ ] Loading state shown during submission
- [ ] Success message displayed after update
- [ ] Updated resource reflects changes immediately
- [ ] User can cancel editing without saving

Priority: High
Sprint: 2
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 12: Delete [Resource] (Frontend)

As a user,
I want to delete one of my [tasks/posts/recipes/etc.],
So that I can remove items I no longer need.

Acceptance Criteria:
- [ ] Delete button available on each resource
- [ ] Confirmation dialog asks "Are you sure?" before deleting
- [ ] DELETE request sent to /api/[resource]/:id endpoint
- [ ] Loading state shown during deletion
- [ ] Success message displayed after deletion
- [ ] Resource is removed from list immediately
- [ ] Error message shown if deletion fails

Priority: High
Sprint: 2
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 13: User Profile Page

As a user,
I want to view my profile information,
So that I can see my account details.

Acceptance Criteria:
- [ ] Profile page accessible from navigation
- [ ] Page displays username, email, and join date
- [ ] Profile data fetched from GET /api/auth/me endpoint
- [ ] Loading state shown while fetching
- [ ] Page is protected (requires authentication)
- [ ] Page is responsive

Priority: Medium
Sprint: 2
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 14: Logout Functionality

As a user,
I want to log out of the application,
So that my account is secure when I'm done.

Acceptance Criteria:
- [ ] Logout button available in navigation
- [ ] Clicking logout removes JWT token from localStorage
- [ ] User is redirected to login/home page
- [ ] Protected routes become inaccessible after logout
- [ ] Success message confirms logout

Priority: Medium
Sprint: 2
Estimated Time: 1 hour
Status: Not Started

---

## Additional Stories (Add Based on Your Project)

### Story 15: [Your Custom Feature]

As a [user type],
I want to [action],
So that [benefit].

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

Priority: [High/Medium/Low]
Sprint: [1 or 2]
Estimated Time: [X hours]
Status: Not Started

---

## Sprint Breakdown

### Sprint 1: Backend Development (Stories 1-8)
**Focus:** Database, Authentication, API Routes

**Stories:**
1. User Registration (Backend)
2. User Login (Backend)
3. Protected Routes Middleware
4. Create Resource API
5. Read Resources API
6. Update Resource API
7. Delete Resource API
8. Security Implementation (Helmet, CORS, Rate Limiting)

**Total Estimated Time:** 15-20 hours

---

### Sprint 2: Frontend Development (Stories 1, 2, 4, 9-14)
**Focus:** React Components, User Interface, Integration

**Stories:**
1. User Registration (Frontend)
2. User Login (Frontend)
4. Protected Routes Component
9. Display Resources List
10. Create Resource Form
11. Update Resource Form
12. Delete Resource
13. User Profile Page
14. Logout Functionality

**Total Estimated Time:** 18-25 hours

---

## Story Status Tracking

Use this section to track your progress:

**Not Started:** Stories you haven't begun
**In Progress:** Stories you're currently working on
**Complete:** Stories that meet all acceptance criteria

### Current Sprint: _____
### Stories In Progress: _____
### Stories Completed: _____
### Stories Remaining: _____

---

## Tips for Writing Good User Stories

1. **Keep stories independent** - Each story should be completable on its own
2. **Make criteria testable** - You should be able to verify each criterion
3. **Estimate realistically** - Better to overestimate than underestimate
4. **Prioritize ruthlessly** - Focus on MVP features first
5. **Update status regularly** - Mark stories complete as you finish them
6. **Break down large stories** - If a story is >6 hours, split it into smaller stories

---

## Story Completion Checklist

Before marking a story as "Complete," verify:
- [ ] All acceptance criteria are met
- [ ] Code is tested and working
- [ ] Code is committed to Git
- [ ] No critical bugs exist
- [ ] Story has been reviewed (if working with partner)
