// import sequelize and set up a connection pool to the mysql database
const Sequelize = require("sequelize");

const sequelize = new Sequelize("hardpost_db", "root", "mysql123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
