const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

// import database connection
const sequelize = require("./config/database");
// import models to map to db tables
const { User, Cart, Order } = require("./models");

const app = express();
const port = process.env.PORT || 3000;

// modular route imports
const apiRoutes = require("./controllers/api");
const shopRoutes = require("./controllers/shop-routes");

app.use(express.static("dist"));

app.use(cors()); //allow for client side requests without getting CORS error
app.use(bodyParser.urlencoded({ extended: true })); // to parse incoming req body
app.use(express.static(path.join(__dirname, "public")));
// serving files from images folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json()); // needed to send json req.body in insomnia post requests

// Create a new sequelize store using the express-session package
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// use the express session middleware providing options
app.use(
  session({
    secret: "temporary secret key",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
    cookie: {
      // maxAge: 1000 * 60 * 60 * 12, // no maxAge bc using also using localStorage to persist logged in status
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// using modular route files
app.use("/api", apiRoutes);
app.use(shopRoutes);

app.use("*", (req, res, next) =>
  // in deployment we send index.html for all additional paths not defined by our express routes
  // react router pushes different paths to window url
  res.sendFile(path.join(__dirname, "dist", "index.html"))
);

// see available magic methods on User instances based on the model associations we defined
// console.log("magic user methods", Object.keys(User.prototype));
// console.log("magic cart methods", Object.keys(Cart.prototype));
// console.log("magic Order methods", Object.keys(Order.prototype));

let testUser; // initialize and reassign later to make user instance globally accessible to all callbacks inside .then promise chain
// create db connection before starting up server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}/`)
    );
  })
  .catch((err) => console.log(err));
