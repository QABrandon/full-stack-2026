# Shopping Cart API - Sequelize Project

A RESTful API for managing users, products, and shopping carts using Express, PostgreSQL, and Sequelize.

## Quick Start

### 1. Start PostgreSQL
**macOS:** `brew services start postgresql@16`
**Windows:** Should be running as a service already

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env File
```
DB_NAME=shopping_cart_db
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

### 4. Create Database
```bash
# Mac
createdb shopping_cart_db

# Windows
psql -U postgres -c "CREATE DATABASE shopping_cart_db;"
```

### 5. Seed Database
```bash
npm run seed
```
Creates 3 users, 6 products, and 5 cart items with relationships.

### 6. Start Server
```bash
npm start
```
Server runs at http://localhost:3000

## Project Structure

```
config/
  database.js            # PostgreSQL connection via Sequelize
models/
  User.js                # Customer model with validation
  Product.js             # Inventory model with categories
  CartItem.js            # Shopping cart with user/product foreign keys
  index.js               # Relationships and exports
controllers/
  userController.js      # User CRUD operations
  productController.js   # Product CRUD operations
  cartItemController.js  # Cart CRUD with eager loading
routes/
  userRoutes.js          # User endpoint definitions
  productRoutes.js       # Product endpoint definitions
  cartItemRoutes.js      # Cart endpoint definitions
server.js                # Express app with route mounting
seed.js                  # Sample data creation
```

## API Endpoints

**Users**
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

**Products**
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

**Cart Items**
```
GET    /api/cart-items
GET    /api/users/:userId/cart-items
GET    /api/cart-items/:id
POST   /api/cart-items
PUT    /api/cart-items/:id
DELETE /api/cart-items/:id
```

## Common Errors

**PostgreSQL not running**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
Solution: `brew services start postgresql@16` or start the Windows service

**Validation error**
```
Validation error: Price cannot be negative
```
Solution: Check all required fields have valid values

**Duplicate email**
```
SequelizeUniqueConstraintError
```
Solution: Use a unique email address

**Port in use**
```
listen EADDRINUSE :::3000
```
Solution: Change PORT in .env or stop other terminals
