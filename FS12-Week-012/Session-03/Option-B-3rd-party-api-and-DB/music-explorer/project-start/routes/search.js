// Search Routes - Music search endpoint
const express = require('express');
const router = express.Router();
const { searchTracks } = require('../config/music');

// TODO: Create GET '/' route that:
//   1. Gets the search query from req.query.q
//   2. If no query, return 400 with error message
//   3. Calls searchTracks(query)
//   4. Returns 200 with JSON: { query, count: tracks.length, tracks }
//   5. Catches errors and returns 500


module.exports = router;
