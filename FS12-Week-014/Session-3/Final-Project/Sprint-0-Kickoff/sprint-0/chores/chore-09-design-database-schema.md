# Chore 9: Design Database Schema

**Estimated Time:** 1-2 hours

## Task
Design database models and relationships before coding

## Steps

- [ ] Identify all data entities needed (User, main resource, related entities)
- [ ] Choose modeling tool:
  - see postgres-resources.md for Postgres tools
  - Paper/whiteboard sketch
  - Draw.io or Lucidchart
  - Excalidraw
- [ ] Design User model with fields:
  - username (String, required, unique)
  - email (String, required, unique)
  - password (String, required, hashed)
  - createdAt (Date)
- [ ] Design main resource model with fields and validation rules
- [ ] Define relationships between models:
  - User has many [resources]
  - Use foreign keys (SQL) to relate tables (e.g., a `userId` column on the resource table)
- [ ] Identify required fields vs optional fields
- [ ] Define data types for all fields
- [ ] Save schema design (screenshot, export, or document)
- [ ] Verify minimum 2 models with relationships (rubric requirement)

## Acceptance Criteria

- [ ] Minimum 2 models designed (User + main resource)
- [ ] All fields have data types specified
- [ ] Relationships between models defined
- [ ] Required vs optional fields identified
- [ ] Validation rules documented
- [ ] Schema design saved and accessible

## PostgreSQL Resources

| Tool | Website | Description |
|------|---------|-------------|
| DbSchema | [dbschema.com](https://dbschema.com) | JDBC-based reverse engineering tool with modular schema diagrams and HTML5 documentation export. |
| pgModeler | [pgmodeler.io](https://pgmodeler.io) | PostgreSQL-first desktop client supporting extensions, domains, and full SQL export. |
| StackRender | [stackrender.io](https://stackrender.io) | Visual schema-to-Sequelize model and migration generator with AI-assisted design. |
| Sequelize UI | [sequelizeui.app](https://sequelizeui.app) | Browser-based playground for generating TypeScript/JavaScript Sequelize models and migrations. |
| PostgreSQL (MS) | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=ms-ossdata.vscode-pgsql) | Official Microsoft VS Code extension with object explorer, IntelliSense, and Copilot integration. |
| sequelize-auto | [github.com/sequelize/sequelize-auto](https://github.com/sequelize/sequelize-auto) | CLI utility that reverse engineers database tables into Sequelize model files. |
| dbdiagram.io | [dbdiagram.io](https://dbdiagram.io) | Code-first ERD tool using DBML syntax for fast prototyping and collaborative diagrams. |
| Gleek.io | [gleek.io](https://gleek.io) | Keyboard-command-based flowcharting and ERD generation for fast diagram creation. |
| SQL Crack | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=buvan.sql-crack) | VS Code extension that visualizes SQL as interactive flow diagrams using local AST parsing. |
