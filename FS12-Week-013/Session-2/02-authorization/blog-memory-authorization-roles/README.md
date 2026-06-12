# Role-Based Authorization Blog (In-Memory)

This example builds directly on `blog-authentication-middleware-demo` and adds
**role-based authorization**. Authentication answers "who are you?" and
authorization answers "what are you allowed to do?". This project shows
how both pieces fit together using middleware.

## What's New Compared to the Authentication Example

| Feature | Authentication Example | This Project |
| --- | --- | --- |
| `User` model | username, email, password | adds `roleId` (foreign key to Role) |
| `Role` model | not present | new model with name, description, permissions |
| Authorization middleware | not present | `requireRole(...)` and `requirePermission(...)` |
| Seeding | not present | starter roles, users, and posts on every boot |
| Admin features | not present | list users, change another user's role, delete any post |

## Roles in This App

There are two roles. Roles are seeded on server start.

| Role | Description | Sample Permissions |
| --- | --- | --- |
| `admin` | Full access. Manages users and any post. | `post:create`, `post:delete-any`, `user:list`, `user:assign-role` |
| `author` | Default for new accounts. Manages their own posts only. | `post:create`, `post:edit-own`, `post:delete-own` |

You can see the live list at any time by hitting `GET /roles` or by looking
at the "Available Roles" panel on the home page.

## Project Structure

```
blog-memory-authorization-roles/
├── server.js                       # Main application entry point + seed step
├── middleware/
│   ├── auth.js                     # Authentication middleware (verifies JWT)
│   └── authorize.js                # NEW - requireRole and requirePermission
├── models/
│   ├── Role.js                     # NEW - role data and helpers
│   ├── User.js                     # User data, now stores roleId
│   └── Post.js                     # Post data
├── controllers/
│   ├── authController.js           # Register and login (puts role in JWT)
│   ├── postController.js           # Post CRUD with admin-or-owner checks
│   ├── userController.js           # Profile, list users (admin), change role (admin)
│   └── roleController.js           # NEW - lists roles for the UI
├── routes/
│   ├── authRoutes.js               # /register, /login
│   ├── postRoutes.js               # /posts uses requireRole('admin','author')
│   ├── userRoutes.js               # /users and /users/:id/role are admin-only
│   └── roleRoutes.js               # NEW - /roles endpoint
├── seeds/
│   └── seedData.js                 # NEW - seeds roles, users, and starter posts
└── public/
    ├── index.html                  # UI now shows role badges and an admin panel
    ├── styles.css
    └── app.js
```

## Setup

```bash
npm install
npm start
```

Visit: http://localhost:3000

> **Port 3000 already in use?** Start the server on a different port:
> `PORT=3055 npm start` (then visit http://localhost:3055).

When the server starts you should see this in the terminal:

```
Seeding starter data...
  Created 2 roles: admin, author
  Created 2 users: admin, alice
  Created 2 sample posts
Seed complete.

Server is running on http://localhost:3000

Seeded login credentials:
  admin  / admin123   (role: admin)
  alice  / alice123   (role: author)
```

## Seeded Accounts

These two accounts are recreated every time the server boots. Use them
to try out the role-based features without having to register first.

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin123` | admin |
| `alice` | `alice123` | author |

New accounts created through `/register` are assigned the `author` role.
An admin can promote them to `admin` later via the Admin Panel
(or `PATCH /users/:userId/role`).

## Tutorial: Discover Authorization in 6 Steps

The point of this walkthrough is to *feel* the difference between
**authentication** ("who are you?") and **authorization**
("what are you allowed to do?"). You'll hit the same endpoint three
times and get three different answers depending on identity and role.

Open a terminal, point your browser at the app, and follow along.

### Step 1 — Hit a protected endpoint with NO token

Before reading the result, predict: *what status code do you expect?*

```bash
curl -i http://localhost:3000/users
```

You'll get **401 Access token required**.

This is the **authentication** middleware (`authenticateToken`) speaking.
There is no user attached to this request, so it bounces you before any
role check ever runs. Authorization didn't even get a turn.

### Step 2 — Log in as Alice and hit the SAME endpoint

In the UI, click **Login** and sign in as `alice` / `alice123`. Then
copy her token from the browser console:

```javascript
localStorage.getItem('authToken')
```

Re-run the exact same `curl` from Step 1, but now include the token:

```bash
curl -i http://localhost:3000/users \
  -H "Authorization: Bearer PASTE_ALICE_TOKEN_HERE"
```

This time you get **403 Access denied**:

```json
{
  "error": "Access denied. This action requires one of these roles: admin",
  "yourRole": "author"
}
```

**This is the moment.** Same URL. Same "blocked" outcome. *Completely
different reason.* Step 1 failed authentication ("we don't know who you
are"). Step 2 passed authentication and failed **authorization** ("we
know exactly who you are - you just aren't allowed"). That distinction
is what this whole project is about.

### Step 3 — Look at the code that creates the difference

Open [routes/userRoutes.js](routes/userRoutes.js):

```js
router.get(
  '/users',
  authenticateToken,           // 1. Who are you? (sets request.user from JWT)
  requireRole('admin'),        // 2. Are you allowed? (checks request.user.roleId)
  userController.getAllUsers   // 3. Actual handler - only runs if both passed
);
```

Three lines. Two outcomes you just saw. The 401 in Step 1 came from
line 1 rejecting the request. The 403 in Step 2 came from line 2
rejecting the request. Line 3 never executed in either case.

This stack is the entire authorization pattern. Every other protected
route in this project follows the same shape.

### Step 4 — Crack open the JWT to see WHERE the role lives

`requireRole` decided Alice was an author without ever calling the
database. How does it know? Open the browser console (still logged
in as Alice):

```javascript
const token = localStorage.getItem('authToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
// { userId: 2, username: 'alice', roleId: 2, roleName: 'author', iat: ..., exp: ... }
```

The role is **stamped into the token at login time**. From then on,
every request carries it. The auth middleware decodes the token and
sets `request.user = payload`. The authorize middleware reads
`request.user.roleId` and compares it to the allowed list. Zero
extra database calls. That's why role-in-token is the standard
pattern for stateless APIs.

### Step 5 — Log in as admin. Watch the SAME call succeed

Log out, then log in as `admin` / `admin123`. Grab the new token
from `localStorage.getItem('authToken')` and re-run the SAME curl:

```bash
curl -i http://localhost:3000/users \
  -H "Authorization: Bearer PASTE_ADMIN_TOKEN_HERE"
```

**200 OK** with the user list. Same code path through both middleware
layers - just a token whose `roleName` is `admin` instead of `author`.

While you're logged in as admin, try the **headline admin power**:
delete one of Alice's posts even though admin doesn't own it.

```bash
curl -i -X DELETE http://localhost:3000/posts/2 \
  -H "Authorization: Bearer PASTE_ADMIN_TOKEN_HERE"
```

Compare to Alice trying the same thing on admin's post (`/posts/1`) -
she gets 403 *"You can only delete your own posts (or you must be
an admin)"*. The role check in `requireRole('admin','author')` lets
both through, then [postController.deletePost](controllers/postController.js)
checks `request.user.roleName === 'admin'` to decide whether to skip
the ownership check. **This is the second authorization pattern**:
when a check needs the resource itself (the post's owner), it lives
in the controller, not the middleware.

### Step 6 — Promote Alice. Watch her old token go stale

Still logged in as admin, promote Alice:

```bash
curl -i -X PATCH http://localhost:3000/users/2/role \
  -H "Authorization: Bearer PASTE_ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"roleName":"admin"}'
```

Now switch back to Alice's **old** token from Step 2 and try `/users`
again. **Still 403.** The promotion didn't reach into her existing
JWT and rewrite it - the token is a snapshot from when she logged in.

Log Alice out and back in. Try once more. **200 OK.** Her brand-new
token has `roleName: "admin"` baked in.

This is the trade-off of putting roles in tokens: blazing fast role
checks, but role changes only take effect on the next login. Real
apps either use short token lifetimes (5-15 min) or maintain a
denylist of revoked tokens.

---

## Two Authorization Patterns You Just Used

| Pattern | Where it lives | When to use it |
| --- | --- | --- |
| `requireRole(...)` middleware | [middleware/authorize.js](middleware/authorize.js) | The decision depends only on **who** the user is. Runs before the controller. |
| In-controller `isAdmin` check | [controllers/postController.js](controllers/postController.js) | The decision depends on the **resource** too (e.g. post ownership). Runs inside the controller after fetching the resource. |

There's also a third helper in this project,
[`requirePermission(perm)`](middleware/authorize.js), which checks a
specific permission string against the user's role. The route
`PATCH /users/:userId/role` uses it - see [routes/userRoutes.js](routes/userRoutes.js).
That's the pattern to reach for when role names get too coarse and
you want fine-grained gates like `user:assign-role` or `post:delete-any`.

## Common Problems and Solutions

### Problem: "Access denied. This action requires one of these roles: admin"
**What this means:** You are logged in but your role does not allow this
action.

**How to fix:** Either log in as the seeded `admin` account, or have an
admin promote your user via the Admin Panel.

### Problem: "Access token required"
**What this means:** You called a protected endpoint without including
the `Authorization: Bearer <token>` header.

**How to fix:** Log in first, copy the token from the response (or from
`localStorage.getItem('authToken')` in the console), and include it.

### Problem: The seeded accounts disappeared after I created some posts
**What this means:** Restarting the server wipes all in-memory data
including users, but the seed step recreates `admin` and `alice`. Any
extra users you registered manually will be gone.

**How to fix:** This is expected. To keep data across restarts you would
need a real database.

### Problem: Promoting myself to a non-admin role fails
**What this means:** There is a guard in `userController.updateUserRole`
that prevents an admin from removing their own admin role - this stops
you from accidentally locking everyone out of admin features.

**How to fix:** Have a different admin user demote you instead.

## Endpoint Summary

| Method | Path | Auth | Role |
| --- | --- | --- | --- |
| POST | `/register` | none | (creates author) |
| POST | `/login` | none | any |
| GET | `/posts` | none | any |
| GET | `/posts/:postId` | none | any |
| GET | `/roles` | none | any |
| GET | `/profile` | required | any |
| GET | `/my-posts` | required | any |
| POST | `/posts` | required | admin or author |
| PUT | `/posts/:postId` | required | admin (any post) or author (own only) |
| DELETE | `/posts/:postId` | required | admin (any post) or author (own only) |
| GET | `/users` | required | admin only |
| PATCH | `/users/:userId/role` | required | admin only |

See `POSTMAN.md` for a step-by-step Postman walkthrough.
