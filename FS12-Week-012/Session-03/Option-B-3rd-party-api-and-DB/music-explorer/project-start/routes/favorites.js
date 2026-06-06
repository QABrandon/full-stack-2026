// Favorites Routes - CRUD operations for saved tracks
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// TODO: POST '/' — Save a track to favorites
//   1. Destructure from req.body: trackId, trackName, artistName, albumName, previewUrl, imageUrl
//   2. Validate required fields exist (trackId, trackName, artistName, albumName, imageUrl)
//      - Return 400 if any are missing
//   3. Check if track already exists: Favorite.findOne({ where: { trackId } })
//      - Return 400 if duplicate: "Track is already in favorites"
//   4. Create the favorite: Favorite.create({ ... })
//   5. Return 201 with the created favorite
//   6. Catch errors → return 500


// TODO: GET '/' — Get all favorites
//   1. Use Favorite.findAll() with order: [['addedAt', 'DESC']]
//   2. Return 200 with JSON: { count: favorites.length, favorites }
//   3. Catch errors → return 500


// TODO: GET '/:id' — Get a single favorite
//   1. Use Favorite.findByPk(req.params.id)
//   2. If not found, return 404: "Favorite not found"
//   3. Return 200 with the favorite
//   4. Catch errors → return 500


// TODO: DELETE '/:id' — Remove a favorite
//   1. Use Favorite.findByPk(req.params.id)
//   2. If not found, return 404: "Favorite not found"
//   3. Call favorite.destroy()
//   4. Return 200 with: { message: "Favorite deleted successfully", favorite }
//   5. Catch errors → return 500


module.exports = router;
