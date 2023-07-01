const router = require("express").Router();
const { User } = require("../../models/");

router.post("/signup", async (req, res) => {
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

  req.session.user = newUser;

  return res.json(req.session.user);
});

router.post("/login", async (req, res) => {
  // check db for matching username

  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!existingUser) return res.send("incorrect credentials");
  req.session.user = existingUser;

  // compare password using instance method defined on user model
  if (existingUser.checkPassword(req.body.password, existingUser.password)) {
    return res.json(req.session.user);
  }
  return res.send("Incorrect credentials");
});

module.exports = router;
