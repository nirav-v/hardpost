import { Cart, Item, User } from '../models/index.js';
import jwt from 'jsonwebtoken';

// util function for verifying the items from users local storage cart before adding them to cart in database
export const checkIfCartItemExists = (cartItem, items) => {
  //  check this case: for each local cart item added, we also have to check if its id still exists in the database as the owner may have already deleted it
  for (const item of items) {
    if (item.id === cartItem.id) {
      // return true if the cartItem exists in the database
      return true;
    }
  }
  // only return false after checking every item
  return false;
};

export const signUpUser = async (req, res) => {
  try {
    const { username, email, password, cart: localCart } = req.body;
    //   check if user exists already
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(401).send({ error: 'account already exists' });
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
    const items = await Item.findAll();

    for (const cartItem of localCart) {
      const validCartItem = checkIfCartItemExists(req.body.cart, items);

      if (validCartItem) {
        // build array of db promises
        addCartItems.push(userCart.addItem(cartItem.id));
      }
    }

    // wait for all items to be added to the users cart
    await Promise.all(addCartItems);

    // create jwt
    const token = jwt.sign(
      { username, email, userId: newUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    return res.status(201).json(token);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, cart: localCart } = req.body;
    // check db for matching username
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!existingUser) {
      return res.status(404).send({ error: 'incorrect credentials' });
    }
    // compare password using instance method defined on user model, return error message if wrong
    if (!existingUser.checkPassword(req.body.password, existingUser.password))
      return res.status(404).send({ error: 'incorrect credentials' });

    // create jwt
    const token = jwt.sign(
      {
        username: existingUser.username,
        email: existingUser.email,
        userId: existingUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    const userCart = await existingUser.getCart();

    const addCartItems = [];

    const items = await Item.findAll();

    for (const cartItem of localCart) {
      // avoid adding the users own items to their cart
      if (cartItem.userId !== existingUser.id) continue;

      const validCartItem = checkIfCartItemExists(localCart, items);

      if (validCartItem) {
        // build array of db promises
        addCartItems.push(userCart.addItem(cartItem.id));
      }
    }

    // wait for all items to be added to the users cart
    await Promise.all(addCartItems);

    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
  }
};
