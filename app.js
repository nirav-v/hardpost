const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// import database connection
const sequelize = require("./util/database");
const User = require("./models/User");
const Item = require("./models/Item");

const app = express();
const port = 3000;

// modular route imports
const adminRoutes = require("./controllers/admin");
const shopRoutes = require("./controllers/shop");

app.use(bodyParser.urlencoded({ extended: false })); // to parse incoming req body
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // needed to send json req.body in insomnia post requests

// finding the first user instance and storing it as user property on all incoming requests
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// using modular route files
app.use(adminRoutes);
app.use(shopRoutes);

app.use("*", (req, res, next) =>
  res.send("navigate to one of the existing routes in your controller")
);

// define model associations
Item.belongsTo(User);
// users and items have a one to many association
User.hasMany(Item);

// create db connection before starting up server
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Nirav", email: "test@test.com" });
    }
    return user;
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}/`)
    );
  })
  .catch((err) => console.log(err));
