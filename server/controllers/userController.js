import { Cart, User } from "../models/index.js";
import jwt from "jsonwebtoken";

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

  // add items to the users cart
  const addCartItems = [];
  for (const item of req.body.cart) {
    addCartItems.push(userCart.addItem(item.id));
  }

  // wait for all items to be added to the users cart
  await Promise.all(addCartItems);

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
  console.log(req.body);
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

    const userCart = await existingUser.getCart();

    const addCartItems = [];
    for (const item of req.body.cart) {
      // avoid adding the users own items to their cart
      if (item.userId !== existingUser.id) {
        addCartItems.push(userCart.addItem(item.id));
      }
    }
    // wait for all items to be added to the users cart
    await Promise.all(addCartItems);

    return res.status(200).json(token);
  }
  // if wrong password
  return res.status(404).send({ error: "incorrect credentials" });
};
