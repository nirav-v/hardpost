const router = require("express").Router();
const { User, Cart } = require("../../models/");

// SIGNUP
router.post("/signup", async (req, res) => {
  console.log("BODY ", req.body);
  const { username, email, password } = req.body;
  //   check if user exists already
  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    return res.send("An account with this email already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  // create a cart to associate with the new user
  const userCart = await newUser.createCart();

  // set and save the user's id on the session. Won't save whole user instance because we lose all sequelize magic methods and other meta data when the object is stringified before being saved on session
  req.session.userId = newUser.id;
  req.session.save(function (err) {
    if (err) return next(err);
  });
  console.log(req.session);
  return res.json(req.session);
});

// LOGIN
router.post("/login", async (req, res) => {
  // check db for matching username

  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!existingUser) return res.send("incorrect credentials");

  // compare password using instance method defined on user model
  if (existingUser.checkPassword(req.body.password, existingUser.password)) {
    // set and save logged in user on session object
    req.session.userId = existingUser.id;
    req.session.save(function (err) {
      if (err) return next(err);
    });
    console.log("session: ", req.session);
    return res.json(req.session);
  }
  return res.send("Incorrect credentials");
});

// LOGOUT
router.get("/logout", async (req, res, next) => {
  if (req.session.userId) {
    await req.session.destroy((err) => console.log(err));
    console.log("session:", req.session);
    return res.send("logged out");
  } else {
    return res.send("how can you log out if you're not logged in?");
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Cart });
  res.json(user);
});

module.exports = router;
