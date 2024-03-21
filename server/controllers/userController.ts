import { Request, Response } from 'express';
import { Cart, Item, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { checkItemExists, validateLocalCartItems } from '../util/cartUtil.js';

export const signUpUser = async (req: Request, res: Response) => {
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
    const dbItems = await Item.findAll();
    const validCartItems = validateLocalCartItems({
      localCart,
      dbItems,
      loggedInUser: newUser,
    });

    const cartPromises: Promise<void>[] = [];

    validCartItems.forEach(
      // build array of db promises for adding valid items to cart
      cartItem => cartPromises.push(userCart.addItem(cartItem.id))
    );
    // wait for all items to be added to the users cart
    await Promise.all(cartPromises);

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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, cart: localCart } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
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
    if (!existingUser.checkPassword(req.body.password))
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

    const dbItems = await Item.findAll();

    const validCartItems = validateLocalCartItems({
      localCart,
      dbItems,
      loggedInUser: existingUser,
    });

    const cartPromises: Promise<void>[] = [];

    validCartItems.forEach(
      // build array of db promises for adding valid items to cart
      cartItem => cartPromises.push(userCart.addItem(cartItem.id))
    );
    // wait for all items to be added to the users cart
    await Promise.all(cartPromises);

    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // get logged in user's data
    const user = await User.findOne({
      where: { id: res.locals.user.userId },
      include: [Cart, Item],
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
