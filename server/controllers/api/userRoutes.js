// const router = require("express").Router();
// const jwt = require("jsonwebtoken");
// const { User, Cart } = require("../../models/");
import { Router } from "express";
import jwt from "jsonwebtoken";
import { User, Cart } from "../../models/index.js";
const router = Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  //   check if user exists already
  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    return res.status(401).send({ error: "account already exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  // create a cart to associate with the new user
  const userCart = await newUser.createCart();

  // create jwt
  const token = jwt.sign(
    { username, email, userId: newUser.dataValues.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  // set and save the user's id on the session. Won't save whole user instance because we lose all sequelize magic methods and other meta data when the object is stringified before being saved on session
  // req.session.userId = newUser.id;
  // req.session.save(function (err) {
  //   if (err) return next(err);
  // });
  return res.status(201).json(token);
});

// LOGIN
router.post("/login", async (req, res) => {
  // check db for matching username

  const existingUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!existingUser) {
    return res.status(404).send({ error: "incorrect credentials" });
  }
  // compare password using instance method defined on user model
  if (existingUser.checkPassword(req.body.password, existingUser.password)) {
    // create jwt
    const token = jwt.sign(
      {
        username: existingUser.username,
        email: existingUser.email,
        userId: existingUser.dataValues.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // set and save logged in user on session object
    // req.session.userId = existingUser.id;
    // req.session.save(function (err) {
    //   if (err) return next(err);
    // });
    // console.log(req.session);
    return res.status(200).json(token);
  }
  // if wrong password
  return res.status(404).send({ error: "incorrect credentials" });
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Cart });
  res.json(user);
});

// module.exports = router;
export default router;
