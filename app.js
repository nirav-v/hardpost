const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// import database connection
const sequelize = require("./util/database");
// import models to map to db tables
const User = require("./models/User");
const Item = require("./models/Item");
const Cart = require("./models/Cart");
const CartItem = require("./models/Cart-Item");

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
app.use("/api", adminRoutes);
app.use(shopRoutes);

app.use("*", (req, res, next) =>
  res.send("navigate to one of the existing routes in your controller")
);

// define model associations
Item.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Item); // users and items have a one to many association
User.hasOne(Cart); // One to one relation between a Cart and User
Cart.belongsTo(User);
Cart.belongsToMany(Item, { through: CartItem });
Item.belongsToMany(Cart, { through: CartItem }); // many to many relation between Cart and Item, junction table is CartItem

// see available magic methods on User instances based on the model associations we defined
console.log("magic user methods", Object.keys(User.prototype));
console.log("magic cart methods", Object.keys(Cart.prototype));

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
  .then((user) => {
    return user.createCart(); // use magic method to immediately create a cart for the associated user
  })
  .then((cart) => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}/`)
    );
  })
  .catch((err) => console.log(err));
