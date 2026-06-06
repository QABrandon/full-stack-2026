# General Approach is to Start Slow

- Commit often
- Use Postman or Thunder Client for testing

## Planning Phase

### 0. Choose Your Project
Choose a project that uses Sequelize effectively and demonstrates your skills:
- **What data relationships does this project need?** (One-to-many, many-to-many)
- **What models will I create?** (Users, Products, Orders, Posts, Comments, etc.)
- **What CRUD operations are needed?** (Create, Read, Update, Delete)
- **Will this have an API?** (Express routes with controllers for frontend)
- **What validations are important?** (Required fields, min/max values, enum options)

**Project Ideas:**
- **Shopping Cart** - Users add products to cart (see completed-app/ example)

### 1. Create Data Model Diagram
Plan your database structure:
- **Excalidraw or paper** for database diagrams
- **Draw.io** for more formal ERD (Entity Relationship Diagram)

**What to include:**
- All tables (models)
- Columns for each model
- Data types (STRING, INTEGER, DECIMAL, BOOLEAN, TEXT)
- Relationships (which models reference each other via foreign keys)
- Validation rules (allowNull, unique, len, min, max, isIn)

**Example for Shopping Cart:**
```
Users Table:
- name (STRING(50), required, 2-50 characters)
- email (STRING, required, unique, lowercase)
- address (STRING(200), optional, default '')
- createdAt, updatedAt (timestamps)

Products Table:
- name (STRING(100), required, 3-100 characters)
- description (TEXT, required, min 10 characters)
- price (DECIMAL(10,2), required, min 0)
- category (STRING, enum: Electronics, Clothing, Books, Home, Sports)
- inStock (BOOLEAN, default true)
- createdAt, updatedAt (timestamps)

CartItems Table:
- userId (INTEGER, foreign key → Users, required)
- productId (INTEGER, foreign key → Products, required)
- quantity (INTEGER, required, min 1, max 99)
- createdAt, updatedAt (timestamps)
```

### 2. Slicing Step
Break down the project into actionable tasks

**Project Organization:**
- Plan tasks using Trello, GitHub Projects, or a simple checklist
- Break each feature into small steps

**Model Planning Template for Each Model:**
- Model name and purpose
- Required fields and validation rules
- Relationships to other models
- Sample seed data

**Definition of Done for Each Model:**
- Model defined with proper DataTypes
- Validation rules implemented
- Model exported correctly
- Controller functions created
- Routes mapped to controllers
- CRUD operations tested
- Model committed to version control

**Definition of Done for the Project:**
- All models created and tested
- MVC architecture implemented (models/, controllers/, routes/)
- Relationships set up in models/index.js
- Seed data populates database successfully
- All CRUD operations work
- Eager loading (include) retrieves related data
- Error handling implemented (try/catch in controllers)
- Code is organized (config, models, controllers, routes folders)
- README with setup instructions
- API tests pass

### 3. Choose Technologies
Database and tools:
- **PostgreSQL** - Local database
- **Sequelize** - ORM for Node.js
- **Express** - Web framework for API
- **dotenv** - Environment variables
- **Beekeeper Studio** - Visual database tool
- **Postman / Thunder Client** (optional) - API testing

## Implementation Phase

### Development Steps

1. **Set up project structure**
   ```
   mkdir my-sequelize-project
   cd my-sequelize-project
   npm init -y
   npm install sequelize pg pg-hstore dotenv express
   ```

2. **Create MVC folder structure**
   ```
   my-sequelize-project/
   ├── config/
   │   └── database.js
   ├── models/
   │   ├── User.js
   │   ├── Product.js
   │   ├── CartItem.js
   │   └── index.js
   ├── controllers/
   │   ├── userController.js
   │   ├── productController.js
   │   └── cartItemController.js
   ├── routes/
   │   ├── userRoutes.js
   │   ├── productRoutes.js
   │   └── cartItemRoutes.js
   ├── .env
   ├── .env.example
   ├── .gitignore
   ├── seed.js
   └── server.js
   ```

3. **Create the PostgreSQL database**
   ```bash
   # Mac
   createdb my_project_db

   # Windows
   psql -U postgres -c "CREATE DATABASE my_project_db;"
   ```

4. **Set up database connection** (config/database.js)
   - Create Sequelize instance with env variables
   - Test connection with authenticate()
   - Export sequelize instance

5. **Create first model** (Start with the simplest model)
   - Define with sequelize.define()
   - Add fields with DataTypes
   - Add validation rules
   - Export model
   - Test by syncing and creating a row

6. **Set up relationships** (models/index.js)
   - Import all models
   - Define hasMany / belongsTo relationships
   - Set foreignKey and onDelete options
   - Export everything

7. **Create controller for first model**
   - Create getAllItems function (findAll)
   - Create getItemById function (findByPk)
   - Create createItem function (create)
   - Create updateItem function (findByPk + update)
   - Create deleteItem function (findByPk + destroy)
   - Add try/catch error handling

8. **Create routes for first model**
   - Import controller
   - Create Express router
   - Map GET, POST, PUT, DELETE routes to controller functions
   - Export router

9. **Set up server.js**
   - Import Express, models, and routes
   - Set up middleware (express.json())
   - Mount routes (app.use('/api/resource', routes))
   - Sync database and start server
   - Test with Postman

10. **Commit frequently** - After each model, controller, and route set is created and tested

11. **Add remaining models, controllers, and routes** - Build one resource at a time
    - Define model with DataTypes
    - Add validation rules
    - Add foreign keys where needed
    - Create controller functions
    - Map routes
    - Test each resource independently

12. **Create seed file** (seed.js)
    - Import all models from models/index.js
    - Sync with force: true (drops and recreates tables)
    - Create sample data with bulkCreate
    - Use foreign key IDs to link related data
    - Test relationships work
    - Verify with Beekeeper Studio

13. **Test CRUD operations**
    - Create rows via API
    - Read with eager loading (include)
    - Update rows
    - Delete rows
    - Test cascade delete

14. **Touch ups** - Polish and refine
    - Add comments explaining logic
    - Clean up console logs
    - Verify all relationships work
    - Test edge cases
    - Update README with API documentation

## Testing Your Project

### Manual Tests to Perform:

**Model Tests:**
- Create a row successfully
- Try to create invalid data (should fail validation)
- Read rows with eager loading
- Update rows
- Delete rows

**Controller Tests:**
- All five CRUD operations work
- Error handling returns proper status codes
- Validation errors are caught
- Eager loading (include) works for related data

**Route Tests:**
- GET /api/resource returns all items
- GET /api/resource/:id returns single item
- POST /api/resource creates new item
- PUT /api/resource/:id updates item
- DELETE /api/resource/:id deletes item

**Relationship Tests:**
- Create related rows (e.g., user and their cart items)
- Include retrieves related data successfully
- Query across relationships
- Verify foreign key constraints work
- Cascade delete removes related rows

**Error Handling Tests:**
- Try connection with wrong credentials
- Try creating row with missing required field
- Try creating row with value out of range
- Try creating duplicate unique field
- Try getting non-existent ID

## Common Challenges and Solutions

### Challenge: Connection Issues
**Problem:** Cannot connect to PostgreSQL

**Solution:**
- Verify PostgreSQL is running (`brew services list` on macOS)
- Check connection settings in .env file
- Verify port is 5432
- Test with `psql` or Beekeeper Studio first

### Challenge: Validation Errors
**Problem:** Rows won't save due to validation

**Solution:**
- Check error message carefully
- Verify required fields are provided
- Check min/max ranges for numbers
- Check isIn values match exactly
- Test with valid data first

### Challenge: Relationships Not Working
**Problem:** Include not returning related data

**Solution:**
- Verify relationships are defined in models/index.js
- Check foreignKey name matches in both hasMany and belongsTo
- Ensure related row exists in the database
- Use correct model in include array
- Import models from models/index.js (not individual files)

### Challenge: Routes Not Found
**Problem:** API returns 404 for valid routes

**Solution:**
- Verify route mounting in server.js
- Check route path matches exactly
- Verify HTTP method (GET, POST, PUT, DELETE)
- Test route order (specific routes before general)

### Challenge: Controller Errors
**Problem:** Server crashes on request

**Solution:**
- Add try/catch to all async functions
- Return proper error responses
- Check that models are imported correctly
- Verify controller functions are exported

## Project Submission Checklist

Before submitting your project:

```
Database Structure:
[ ] All models created with proper DataTypes
[ ] Validation rules implemented
[ ] Relationships defined with foreignKey
[ ] Timestamps enabled on models

MVC Architecture:
[ ] models/ folder with one file per model + index.js
[ ] controllers/ folder with business logic
[ ] routes/ folder with endpoint definitions
[ ] server.js with route mounting
[ ] Separation of concerns maintained

Code Organization:
[ ] config/database.js exists and works
[ ] .env file (not committed to git)
[ ] .env.example with template
[ ] .gitignore includes node_modules and .env

Functionality:
[ ] Can connect to PostgreSQL successfully
[ ] Seed script populates database with related data
[ ] All CRUD operations work for each model
[ ] Eager loading (include) retrieves related data
[ ] Error handling implemented in controllers
[ ] API returns appropriate status codes

Documentation:
[ ] README with setup instructions
[ ] API endpoints documented
[ ] Comments explain complex logic
[ ] Example .env file (.env.example)

Testing:
[ ] Manually tested all API endpoints
[ ] Verified data in Beekeeper Studio
[ ] Tested error scenarios
[ ] All relationships work correctly
```

## Extra Credit Ideas

If you finish early and want to challenge yourself:

1. **Add Postman Collection** - Create tests for all endpoints with assertions
2. **Implement hooks** - beforeCreate, beforeUpdate hooks on models
3. **Add more complex queries** - Filtering, searching, aggregation with Sequelize operators
4. **Implement soft delete** - Add a `deletedAt` column using Sequelize's `paranoid` option
5. **Add custom validators** - Beyond built-in Sequelize validators
6. **Create indexes** - Optimize query performance
7. **Add pagination** - Limit and offset for large datasets
8. **Implement search** - Find rows using Op.like / Op.iLike

## Resources

- Sequelize Documentation: https://sequelize.org/docs/v6/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Express Documentation: https://expressjs.com/

## Tips for Success

1. **Start simple** - Get one model working before adding complexity
2. **Follow MVC pattern** - Keep models, controllers, and routes separate
3. **Test often** - Don't wait until everything is built to test
4. **Use Beekeeper Studio** - Visual feedback helps catch mistakes
5. **Read error messages** - They usually tell you exactly what's wrong
6. **Commit frequently** - Save your progress after each completed feature
7. **Use the example** - Reference completed-app/ folder for guidance
8. **Ask for help** - If stuck for more than 30 minutes, ask questions

Good luck building your Sequelize / Express project!
