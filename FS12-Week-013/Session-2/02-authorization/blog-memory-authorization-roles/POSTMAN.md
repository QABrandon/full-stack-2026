# Postman Walkthrough: Roles and Authorization

This guide walks through testing the role-based blog API using Postman
(or `curl` if you prefer). The goal is to *see* the difference an
admin role makes versus an author role.

## Setup

```bash
npm install
npm start
```

The seed step creates these accounts on every server start:

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin123` | admin |
| `alice` | `alice123` | author |

Set a Postman variable `baseUrl` to `http://localhost:3000`.

## Recommended Test Order

Follow these requests in order to see every role-based check fire.

---

### Step 1 - View the seeded roles (public)

**GET** `{{baseUrl}}/roles`

Expected response: a JSON object listing both roles with their
descriptions and permissions. No token needed.

---

### Step 2 - View public posts (public)

**GET** `{{baseUrl}}/posts`

Expected response: the two seeded posts. Confirms read access is open
to anyone.

---

### Step 3 - Try the admin-only user list WITHOUT logging in

**GET** `{{baseUrl}}/users`

Expected response (401):

```json
{ "error": "Access token required" }
```

This proves the `/users` endpoint is now behind both authentication
*and* authorization (in the original auth example it was open to
everyone).

---

### Step 4 - Log in as the admin

**POST** `{{baseUrl}}/login`

Body (JSON):

```json
{ "username": "admin", "password": "admin123" }
```

Expected response includes a `token`. In Postman, save it to a
collection variable called `adminToken` using a Test script:

```javascript
const data = pm.response.json();
pm.collectionVariables.set('adminToken', data.token);
```

The user object in the response now includes `roleName: "admin"`.

---

### Step 5 - List users WITH the admin token

**GET** `{{baseUrl}}/users`

Headers: `Authorization: Bearer {{adminToken}}`

Expected response (200): all users with their `roleName` included.

---

### Step 6 - Log in as Alice (the author)

**POST** `{{baseUrl}}/login`

Body:

```json
{ "username": "alice", "password": "alice123" }
```

Save the token as `aliceToken`.

---

### Step 7 - Try the user list as Alice

**GET** `{{baseUrl}}/users`

Headers: `Authorization: Bearer {{aliceToken}}`

Expected response (403):

```json
{
  "error": "Access denied. This action requires one of these roles: admin",
  "yourRole": "author"
}
```

This is the `requireRole('admin')` middleware blocking the request.
The `yourRole` field tells you exactly which role you have, which is
useful when debugging.

---

### Step 8 - Alice creates a post (author can do this)

**POST** `{{baseUrl}}/posts`

Headers: `Authorization: Bearer {{aliceToken}}`

Body:

```json
{ "title": "Alice's New Post", "content": "Author roles can create posts." }
```

Expected response (201) with the new post. Save `data.post.id` as
`alicePostId`.

---

### Step 9 - Admin deletes Alice's post (admin override)

**DELETE** `{{baseUrl}}/posts/{{alicePostId}}`

Headers: `Authorization: Bearer {{adminToken}}`

Expected response (200):

```json
{ "message": "Post deleted successfully" }
```

This is the key admin power: the admin did NOT author this post but
was still allowed to delete it. The check happens in
`postController.deletePost`:

```js
const isAdmin = request.user.roleName === 'admin';
const isOwner = post.author === request.user.userId;
if (!isAdmin && !isOwner) { /* 403 */ }
```

---

### Step 10 - Admin promotes Alice to admin

**PATCH** `{{baseUrl}}/users/2/role`

Headers: `Authorization: Bearer {{adminToken}}`

Body:

```json
{ "roleName": "admin" }
```

Expected response (200):

```json
{
  "message": "User alice is now a admin",
  "user": { "id": 2, "username": "alice", "roleName": "admin", ... }
}
```

Important: Alice's existing `aliceToken` still says `roleName: "author"`
because the role is baked in at login. To pick up her new role she
needs to log in again.

---

### Step 11 - Re-login as Alice and confirm her new role

Run the **Re-Login as Alice (token refresh)** request in the Admin
Journey folder. It logs Alice back in and overwrites `{{authorToken}}`
with a fresh JWT that carries the new admin role.

Now re-run **Step 7** ("Author Tries to List Users"). Instead of 403
you'll get 200 - Alice can list users because her brand-new token
has `roleName: "admin"` baked in.

---

### Step 12 - Try to demote yourself (should be blocked)

While logged in as the admin from Step 4:

**PATCH** `{{baseUrl}}/users/1/role`

Body:

```json
{ "roleName": "author" }
```

Expected response (400):

```json
{ "error": "You cannot remove your own admin role" }
```

This guard exists in `updateUserRole` so an admin can't accidentally
strip their own admin powers.

## Common Problems and Solutions

### Problem: My request returns 403 even though I just got promoted
**What this means:** Your JWT was issued before the promotion and still
contains your old role.

**How to fix:** Log in again to get a new token with the updated role.

### Problem: After restarting the server my new accounts are gone
**What this means:** Data is in memory. Restart wipes everything except
the seeded admin and alice accounts.

**How to fix:** This is by design. Use the seeded accounts for repeatable
tests, or migrate to a real database to keep data around.

### Problem: I see `data.user.roleName` is `unknown`
**What this means:** Somehow a user has a `roleId` that doesn't match
any role in the Role model. This shouldn't happen with the seed step
in place but it can happen if you manually create a user with a bogus
`roleId`.

**How to fix:** Restart the server to re-seed, or PATCH the user's role
to a valid value.

## Quick `curl` Reference

If you'd rather not use Postman:

```bash
# Login as admin and capture the token
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# List all users (admin-only)
curl -s http://localhost:3000/users \
  -H "Authorization: Bearer $ADMIN_TOKEN" | python3 -m json.tool

# Promote alice (id=2) to admin
curl -s -X PATCH http://localhost:3000/users/2/role \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"roleName":"admin"}' | python3 -m json.tool
```
