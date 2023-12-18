// const router = require("express").Router();
// const { Cart, Item, User } = require("../../models");
// const jwt = require("jsonwebtoken");
// const Auth = require("../../util/serverAuth");
import { Router } from "express";
import { Cart, Item, User } from "../../models/index.js";
import jwt from "jsonwebtoken";
import Auth from "../../util/serverAuth.js";
const router = Router();

router.get("/cart", async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).send({
        unauthorized: "no token provided in headers, please log in first",
      });
    console.log("auth header: ", req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("payload: ", payload);
    const loggedInUser = await User.findOne({
      where: { email: payload.email },
    });
    if (loggedInUser) {
      const cart = await loggedInUser.getCart();
      const cartItems = await cart.getItems(); //magic method from many to many association between Cart and Item
      // console.log(cart);
      res.json(cartItems);
    } else {
      res.send("not logged in");
    }
  } catch (err) {
    console.log(err);
  }
});

// adding item to cart
router.post("/cart", async (req, res, next) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({
    where: { email: payload.email },
  });
  const cart = await Cart.findOne({
    where: {
      userId: loggedInUser.id,
    },
  }); // fetch the users cart

  const itemId = req.body.itemId;

  let itemQuantity = 1; // default the quantity to one for cases where item is not in cart
  const existingItems = await cart.getItems({
    where: { id: itemId }, //should return array of of one or zero items in cart with that id
  });
  // for updating quantity of an existing cart item
  if (existingItems.length > 0) {
    const currentQuantity = existingItems[0].cartItem.quantity;
    itemQuantity = currentQuantity + 1;
  }
  // find the item and add it with a the correct quantity
  const itemToAdd = await Item.findByPk(itemId);
  const addedItem = await cart.addItem(itemToAdd, {
    through: { quantity: itemQuantity },
  }); // specify value for extra fields that were created in the cart-item junction table
  // respond with the updated cart items
  res.redirect("/api/cart");
});

router.post("/cart/delete-item", async (req, res, next) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { email: payload.email } });
  const itemId = req.body.itemId;
  const cart = await loggedInUser.getCart(); // get the users cart
  const cartItems = await cart.getItems({ where: { id: itemId } }); // get items from user's cart matching the req body id - returns array of matching items
  // delete that item from the cartItems table
  if (cartItems.length > 0) {
    const deletedItem = await cartItems[0].cartItem.destroy();
  }
  res.redirect("/api/cart");
});

// module.exports = router;
export default router;
