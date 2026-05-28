```javascript
// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({
    user: { id: userId },
    post: { id: postId },
    relationship: `Post ${postId} by User ${userId}`
  });
});

// Optional parameters
app.get('/posts/:year/:month?', (req, res) => {
  const { year, month } = req.params;
  res.json({
    filter: {
      year: parseInt(year),
      month: month ? parseInt(month) : null
    },
    message: month ? `Posts from ${month}/${year}` : `All posts from ${year}`
  });
});
```

### Query Strings
```javascript
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10, category } = req.query;

  let results = users.filter(user =>
    user.name.toLowerCase().includes(q?.toLowerCase() || '')
  );

  res.json({
    searchParams: {
      query: q,
      page: parseInt(page),
      limit: parseInt(limit),
      category: category
    },
    results: results,
    totalResults: results.length,
    pagination: {
      currentPage: parseInt(page),
      resultsPerPage: parseInt(limit)
    }
  });
});
