### How express.json() Works
```javascript
// app.js
const express = require('express');
const app = express();

// Add express.json() middleware - this parses JSON request bodies
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Now this will work
app.post('/users', (req, res) => {
  console.log('Request body:', req.body); // Now it works!

  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created',
    user: newUser
  });
});

app.get('/users', (req, res) => {
  res.json({ users });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```