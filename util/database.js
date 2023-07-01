// import sequelize and set up a connection pool to the mysql database
const Sequelize = require("sequelize");
require("dotenv").config(); // configure package for loading local env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
