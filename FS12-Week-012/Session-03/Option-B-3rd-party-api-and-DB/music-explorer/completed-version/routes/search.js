// Search Routes - Music search endpoint
const express = require('express');
const router = express.Router();
const { searchTracks } = require('../config/music');

// GET / — Search for tracks
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required. Use ?q=your+search' });
    }

    const tracks = await searchTracks(query);

    res.status(200).json({
      query: query,
      count: tracks.length,
      tracks: tracks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
