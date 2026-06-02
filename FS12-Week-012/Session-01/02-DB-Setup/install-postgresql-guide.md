# Installing PostgreSQL & Beekeeper Studio

## What You'll Install

- **PostgreSQL** (database server + `psql` command-line tool) - **Required**
- **Beekeeper Studio** (free visual database editor) - **Recommended**

---

## Install PostgreSQL

### Mac

1. Open Terminal (cmd+space > "terminal" > enter)
2. READ CAREFULLY - ONLY Install Homebrew if you don't have it:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Enter password when asked, hit enter for XCode prompt
- Run each `echo` command from the "Next Steps" output one by one

3. Install and start PostgreSQL:

```bash
brew install postgresql@16
brew services start postgresql@16
```

4. Verify:

```bash
psql --version
psql postgres
```

You should see `postgres=#` prompt. Type `\q` to exit.

### Windows

1. Download installer: https://www.postgresql.org/download/windows/ → "Download the installer"
2. Run the `.exe`, keep defaults, make sure **Command Line Tools** is checked
3. **Set a password and REMEMBER IT!**
4. Keep default port **5432**, finish install
5. Add to PATH:
   - `Win + R` → `sysdm.cpl` → Advanced → Environment Variables
   - Edit "Path" under System Variables → New → `C:\Program Files\PostgreSQL\16\bin`
6. Open PowerShell and verify:

```cmd
psql --version
psql -U postgres
```

Enter your password. You should see `postgres=#`. Type `\q` to exit.

---

## Install Beekeeper Studio

### Mac

```bash
brew install --cask beekeeper-studio
```

Or download from: https://www.beekeeperstudio.io/get

### Windows

Download from: https://www.beekeeperstudio.io/get → run the installer.

---

## Connect Beekeeper Studio to PostgreSQL

1. Open Beekeeper Studio
2. New connection with these settings:

| Field    | Value                                         |
| -------- | --------------------------------------------- |
| Type     | Postgres                                      |
| Host     | localhost                                     |
| Port     | 5432                                          |
| User     | postgres (optional - Mac)                     |
| Password | _(your password — Mac users can leave blank)_ |
| Database | postgres                                      |

3. Click **Test** → green success → **Connect**

---

## Test Your Setup

In Beekeeper's query tab, run:

```sql
CREATE DATABASE test_db;
```

File > Disconnect

New Connection

New connection with these settings:

| Field    | Value                                         |
| -------- | --------------------------------------------- |
| Type     | Postgres                                      |
| Host     | localhost                                     |
| Port     | 5432                                          |
| User     | postgres (optional - Mac)                     |
| Password | _(your password — Mac users can leave blank)_ |
| Database | test_db                                       |

Refresh sidebar, connect to `test_db`, then:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com');

SELECT * FROM users;
```

You should see your two users in the results.

---

## Useful psql Commands

```
\l          List all databases
\c db_name  Connect to a database
\dt         List tables
\d table    Describe a table
\q          Quit
```

---

## Troubleshooting

| Problem                          | Fix                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| PostgreSQL won't start           | Mac: `brew services restart postgresql@16` / Windows: `services.msc` → restart postgresql service |
| "password authentication failed" | Mac: try `psql postgres` (no password) / Windows: use password from install                       |
| "connection refused"             | PostgreSQL isn't running — start it first                                                         |
| Beekeeper can't connect          | Try `127.0.0.1` instead of `localhost`, verify PostgreSQL is running                              |
