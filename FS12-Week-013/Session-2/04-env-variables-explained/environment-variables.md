1. process.env
   -> Variables (secrets, api keys, port numbers etc)
2. .gitignore + .env = safety for your api keys
3. dotenv -> helps load the .env file automatically into process.env for you
 - https://www.npmjs.com/package/dotenv
4. Make sure your .gitignore is ignoring your .env file