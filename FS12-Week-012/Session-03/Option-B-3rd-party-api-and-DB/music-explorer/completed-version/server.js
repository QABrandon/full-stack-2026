// Music Explorer API Server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDatabase } = require('./config/database');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const searchRouter = require('./routes/search');
const favoritesRouter = require('./routes/favorites');

// Mount routes
app.use('/api/search', searchRouter);
app.use('/api/favorites', favoritesRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Music Explorer API!',
    endpoints: {
      search: 'GET /api/search?q=your+search+query',
      favorites: {
        getAll: 'GET /api/favorites',
        getOne: 'GET /api/favorites/:id',
        create: 'POST /api/favorites',
        delete: 'DELETE /api/favorites/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Connect to database, sync tables, and start server
async function startServer() {
  await connectDatabase();
  await sequelize.sync({ alter: true });
  console.log('Database tables synced!');

  app.listen(PORT, () => {
    console.log(`\nMusic Explorer API`);
    console.log(`==========================`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`\nEndpoints:`);
    console.log(`  GET    /api/search?q=query`);
    console.log(`  GET    /api/favorites`);
    console.log(`  GET    /api/favorites/:id`);
    console.log(`  POST   /api/favorites`);
    console.log(`  DELETE /api/favorites/:id`);
    console.log(`\n==========================\n`);
  });
}

startServer();
