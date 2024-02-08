import { User, Item } from '../models/index.js';
import Stripe from 'stripe';
import Auth from '../util/serverAuth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

type LineItemsType = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  };
  quantity: number;
};

export const createStripCheckoutSession = async (req, res) => {
  const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

  const loggedInUser = await User.findOne({ where: { email: payload.email } });

  if (!loggedInUser) {
    res.status(404).json({
      error: `could not find user account matching with email ${payload.email}`,
    });
    return;
  }

  const userCart = await loggedInUser.getCart();
  const cartItems = await userCart.getItems();

  let { domain } = req.body;
  const line_items: LineItemsType[] = [];
  for (const item of cartItems) {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`${item.imagePath}`],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1, // should always be 1 by default
    });
  }

  // console.log('line_items: ', line_items);

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: 'payment',
    success_url: `${domain}/orders`,
    cancel_url: `${domain}?canceled=true`,
    customer_email: payload.email,
  });

  res.json({ id: session.id });
};

export const createOrder = async (req, res, next) => {
  try {
    const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

    const loggedInUser = await User.findOne({
      where: { email: payload.email },
    });

    if (!loggedInUser) {
      res.status(404).json({
        error: `could not find user account matching with email ${payload.email}`,
      });
      return;
    }

    const cart = await loggedInUser.getCart();
    const items = await cart.getItems();
    const order = await loggedInUser.createOrder();
    // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
    await order.addItems(items);
    await cart.setItems([]); //clear user's cart after order is placed
    const updatedItems = await cart.getItems();
    console.log(updatedItems);
    res.status(201).redirect('/orders');
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);

    const loggedInUser = await User.findOne({
      where: { email: payload.email },
    });

    if (!loggedInUser) {
      res.status(404).json({
        error: `could not find user account matching with email ${payload.email}`,
      });
      return;
    }

    const orders = await loggedInUser.getOrders({
      include: ['items'],
    }); // tells sequelize to also load all items associated with each order
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
};
