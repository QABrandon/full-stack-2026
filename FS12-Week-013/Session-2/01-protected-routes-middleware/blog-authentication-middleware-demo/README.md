# In-Memory Blog with MVC Architecture

This example demonstrates protected routes and middleware using proper MVC (Model-View-Controller) architecture.

## Project Structure

```
blog-memory-auth/
├── server.js                    # Main application entry point
├── middleware/
│   └── auth.js                  # Authentication middleware
├── models/
│   ├── User.js                  # User data model
│   └── Post.js                  # Post data model
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── postController.js        # Post CRUD logic
│   └── userController.js        # User profile logic
├── routes/
│   ├── authRoutes.js            # Authentication endpoints
│   ├── postRoutes.js            # Post endpoints
│   └── userRoutes.js            # User endpoints
└── public/
    ├── index.html               # Frontend
    ├── styles.css
    └── app.js
```

## MVC Pattern

**Model** - Data management
- User.js - User operations
- Post.js - Post operations

**View** - User interface
- public/ folder

**Controller** - Business logic
- authController.js - Auth logic
- postController.js - Post logic
- userController.js - User logic

## Request Flow

```
Client Request → Server → Routes → Middleware → Controller → Model → Response
```

## Setup

```bash
npm install
npm start
```

Visit: http://localhost:3000

## Key Features

- MVC architecture
- Reusable middleware
- Resource ownership validation
- Separation of concerns
- Industry best practices
