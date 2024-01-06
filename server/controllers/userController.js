import { User } from "../models/index.js";
import jwt from "jsonwebtoken";

// TODO: add logic to signup and login routes to accept list of itemIds from the client side local storage cart and insert them into the user's real cart in db

export const signUpUser = async (req, res) => {
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

  return res.status(201).json(token);
};

export const loginUser = async (req, res) => {
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
};
