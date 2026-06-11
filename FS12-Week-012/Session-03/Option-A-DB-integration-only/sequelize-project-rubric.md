# Sequelize Project - Assessment Rubric

## Must Have (Required for Passing)

### Database Connection & Configuration
- [ ] PostgreSQL database created
- [ ] Sequelize connection configured in config/database.js
- [ ] Environment variables used for connection settings (.env)
- [ ] .env.example file provided
- [ ] Connection error handling implemented

### Schema & Model Design
- [ ] At least 3 models defined with sequelize.define()
- [ ] Appropriate DataTypes used (STRING, INTEGER, TEXT, BOOLEAN, DECIMAL)
- [ ] Required fields have allowNull: false
- [ ] At least 2 validation rules per model (len, min, max, isEmail, isIn, notEmpty)
- [ ] Unique constraints where appropriate
- [ ] Timestamps enabled (createdAt, updatedAt)

### Data Relationships
- [ ] At least one hasMany / belongsTo relationship ???
- [ ] Foreign keys properly configured with foreignKey option
- [ ] Relationships defined in models/index.js

### CRUD Operations
- [ ] Create operations work (Model.create)
- [ ] Read operations work (findAll, findByPk with include)
- [ ] Update operations work (findByPk + update)
- [ ] Delete operations work (findByPk + destroy)
- [ ] Eager loading (include) used to retrieve related data

### Data Seeding
- [ ] seed.js file creates sample data
- [ ] Uses sync({ force: true }) to reset tables
- [ ] Creates data across all models
- [ ] Related data properly linked with foreign keys

### Error Handling & Validation
- [ ] try/catch blocks in all controller functions
- [ ] Appropriate HTTP status codes (200, 201, 400, 404, 500)
- [ ] Validation errors return meaningful messages
- [ ] 404 responses for resources not found

## Could Have (Bonus Points)
- [ ] Custom model hooks (beforeCreate, beforeUpdate)
- [ ] Advanced queries using Sequelize operators (Op.gt, Op.like, Op.between)
- [ ] Pagination with limit and offset
- [ ] Search functionality with Op.iLike
- [ ] onDelete: "CASCADE" used where appropriate
- [ ] Paranoid mode (soft deletes with deletedAt)
- [ ] Using the Postman collection with test assertions
- [ ] Additional model indexes for performance
- [ ] Input sanitization beyond basic validation

## Submission Requirements

### Technical
- [ ] Project runs with `npm install && npm run seed && npm start`
- [ ] MVC folder structure (models/, controllers/, routes/, config/)
- [ ] .gitignore excludes node_modules and .env

### Data Model
- [ ] At least 3 related models
- [ ] Clear foreign key relationships
- [ ] Meaningful seed data demonstrating relationships

### Code Quality
- [ ] Clean, readable code with comments where needed
- [ ] Consistent naming conventions
- [ ] No hardcoded database credentials
- [ ] Controllers imported from models/index.js (not individual model files)

### Functionality
- [ ] All CRUD endpoints return correct data
- [ ] Eager loading returns nested related data
- [ ] Validation prevents bad data from being saved
- [ ] Cascade delete removes related rows

**Due Date:** June 13
**Submission Method:** Github Repo link on #project-showcase channel