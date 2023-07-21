This project is still in development

## usage

to run locally:

- clone repo
- 'npm install' all dependencies inside root, client, and server folders
- in server folder, create .env file with DB_NAME="hardpost_db", and DB_USER and DB_PASSWORD set to your MySQL credentials (default user is 'root')
- still in server, log into MySQL shell and run 'source db/schema.sql' to create database
- return to root of project an 'npm run start' to run node-express server and vite dev mode concurrently
