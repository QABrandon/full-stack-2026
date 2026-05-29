### Basic App Without Middleware
```javascript
// app.js
const express = require('express');
const app = express();

// This will NOT work for JSON requests
app.post('/users', (req, res) => {
  console.log('Request body:', req.body); // undefined!
  res.json({ error: 'Cannot read body' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```