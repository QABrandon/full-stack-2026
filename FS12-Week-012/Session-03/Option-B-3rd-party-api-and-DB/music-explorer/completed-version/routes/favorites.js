// Favorites Routes - CRUD operations for saved tracks
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// POST / — Save a track to favorites
router.post('/', async (req, res) => {
  try {
    const { trackId, trackName, artistName, albumName, previewUrl, imageUrl } = req.body;

    // Validate required fields
    if (!trackId || !trackName || !artistName || !albumName || !imageUrl) {
      return res.status(400).json({
        error: 'Missing required fields: trackId, trackName, artistName, albumName, imageUrl'
      });
    }

    // Check for duplicate
    const existing = await Favorite.findOne({ where: { trackId } });
    if (existing) {
      return res.status(400).json({ error: 'Track is already in favorites' });
    }

    // Create and save
    const favorite = await Favorite.create({
      trackId,
      trackName,
      artistName,
      albumName,
      previewUrl: previewUrl || null,
      imageUrl
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET / — Get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      order: [['addedAt', 'DESC']]
    });

    res.status(200).json({
      count: favorites.length,
      favorites: favorites
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:id — Get a single favorite
router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:id — Remove a favorite
router.delete('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    await favorite.destroy();

    res.status(200).json({
      message: 'Favorite deleted successfully',
      favorite: favorite
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
