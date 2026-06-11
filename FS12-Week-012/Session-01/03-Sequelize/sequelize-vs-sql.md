

## We can use JS instead of SQL to write SQL queries


Instead of this SQL statement
```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```
We can write this one
```javascript
const jane = await User.create({ name: 'Alice', email: 'alica@example.com' });
```