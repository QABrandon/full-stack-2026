# Owasp Top 10
## 1. Broken Access Control

Common issues:
- Accessing resources by modifying the URL, internal state, or HTML page
- Viewing or editing someone else's account by changing the ID parameter
- Missing access control checks for POST, PUT, DELETE requests
- Elevation of privilege (acting as admin without being logged in as admin)

**Vulnerable Code:**
```javascript
// WRONG - No ownership check
app.get('/api/account/:id', authenticateToken, async (req, res) => {
  const accountId = req.params.id;

  // Any logged-in user can view any account
  const account = await Account.findById(accountId);

  res.json({ account: account });
});

// Attack: User with ID 123 can access /api/account/456 to view another user's account
```

**Secure Code:**
```javascript
// RIGHT - Verify ownership
app.get('/api/account/:id', authenticateToken, async (req, res) => {
  const accountId = req.params.id;

  // Verify the logged-in user owns this account
  if (req.user.accountId !== accountId) {
    return res.status(403).json({ error: 'Access denied. You can only view your own account.' });
  }

  const account = await Account.findById(accountId);
  res.json({ account: account });
});
```

Prevent Issues
- Deny access by Default (use middleware on every route)
- Ownership checks on every resource
- Access control on each request
- Logs for access control (alerts suspicious)
- Disable directory listings - least privilege