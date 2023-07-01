const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// import database connection
const sequelize = require("./util/database");
// import models to map to db tables
const { User, Cart, Order } = require("./models");

const app = express();
const port = 3000;

// modular route imports
const apiRoutes = require("./controllers/api");
const shopRoutes = require("./controllers/shop");

app.use(bodyParser.urlencoded({ extended: false })); // to parse incoming req body
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // needed to send json req.body in insomnia post requests
// use the express session middleware providing options
app.use(
  session({
    secret: "temporary secret key",
  })
);

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
app.use("/api", apiRoutes);
app.use(shopRoutes);

app.use("*", (req, res, next) =>
  res.send("navigate to one of the existing routes in your controller")
);

// see available magic methods on User instances based on the model associations we defined
console.log("magic user methods", Object.keys(User.prototype));
console.log("magic cart methods", Object.keys(Cart.prototype));
console.log("magic Order methods", Object.keys(Order.prototype));

let testUser; // initialize and reassign later to make user instance globally accessible to all callbacks inside .then promise chain
// create db connection before starting up server
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        username: "Nirav",
        email: "test@test.com",
        password: "123456",
      });
    }
    return user;
  })
  .then((user) => {
    testUser = user;
    return user.getCart();
  })
  .then((cart) => {
    if (!cart) {
      return testUser.createCart(); // use magic method to immediately create a cart for the associated user
    }
    return cart;
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}/`)
    );
  })
  .catch((err) => console.log(err));
