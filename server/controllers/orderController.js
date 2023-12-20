import { User, Item } from "../../models/index.js";
import Stripe from "stripe";
import Auth from "../../util/serverAuth.js";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripCheckoutSession = async (req, res) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { email: payload.email } });
  const userCart = await loggedInUser.getCart();
  const items = await userCart.getItems();
  const order = await loggedInUser.createOrder();
  // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
  await order.addItems(
    items.map((item) => {
      item.orderItem = { quantity: item.cartItem.quantity };
      return item;
    })
  );
  await userCart.setItems(null); //clear user's cart after order is placed

  let { domain } = req.body;
  const { cart } = req.body;

  const line_items = [];
  for (const item of cart) {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [`${item.imagePath}`],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    });
  }

  console.log("line_items: ", line_items);

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${domain}/orders`,
    cancel_url: `${domain}?canceled=true`,
  });

  // mark all items from the cart as sold
  for (let item of items) {
    Item.update({ sold: true }, { where: { id: item.id } });
  }

  console.log(items);

  res.json({ id: session.id });
};

export const createOrder = async (req, res, next) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { email: payload.email } });
  const cart = await loggedInUser.getCart();
  const items = await cart.getItems();
  const order = await loggedInUser.createOrder();
  // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
  await order.addItems(
    items.map((item) => {
      item.orderItem = { quantity: item.cartItem.quantity };
      return item;
    })
  );
  await cart.setItems(null); //clear user's cart after order is placed
  const updatedItems = await cart.getItems();
  console.log(updatedItems);
  res.status(201).redirect("/orders");
};

export const getUserOrders = async (req, res, next) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  console.log("PAYLOAD: ", payload);

  const loggedInUser = await User.findOne({
    where: { email: payload.email },
  });
  const orders = await loggedInUser.getOrders({
    include: ["items"],
  }); // tells sequelize to also load all items associated with each order
  res.send(orders);
};
