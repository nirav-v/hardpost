import { Cart, Item, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const getUserCart = async (req: Request, res: Response) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).send({
        unauthorized: 'no token provided in headers, please log in first',
      });

    const token = req.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("payload: ", payload);

    const loggedInUser = await User.findOne({
      where: { email: res.locals.user.email },
    });

    if (!loggedInUser)
      return res.json({ msg: 'could not find a user with that email' });

    const cart = await loggedInUser.getCart();
    const cartItems = await cart.getItems(); //magic method from many to many association between Cart and Item
    // console.log(cartItems);
    res.json(cartItems);
  } catch (err) {
    console.log(err);
  }
};

export const addCartItem = async (req: Request, res: Response) => {
  // const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({
    where: { email: res.locals.user.email },
  });

  const cart = await Cart.findOne({
    where: {
      userId: loggedInUser?.id,
    },
  }); // fetch the users cart

  const itemId = req.body.itemId;

  let itemQuantity = 1; // default the quantity to 1

  // find the item and add it with a the correct quantity
  const itemToAdd = await Item.findByPk(itemId);
  if (itemToAdd) {
    await cart?.addItem(itemToAdd); // specify value for extra fields that were created in the cart-item junction table
  }
  // respond with the updated cart items
  res.redirect('/api/cart');
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const loggedInUser = await User.findOne({
    where: { email: res.locals.user.email },
  });
  const itemId = req.body.itemId;
  const cart = await loggedInUser?.getCart(); // get the users cart
  const cartItems = await cart?.getItems({ where: { id: itemId } }); // get items from user's cart matching the req body id - returns array of matching items
  // delete that item from cartItems table
  console.log(cartItems);
  if (cartItems && cartItems.length > 0) {
    const deletedItem = await cartItems[0].cartItem.destroy();
  }
  res.redirect('/api/cart');
};
