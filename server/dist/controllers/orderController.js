var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/index.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
export const createStripCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = yield User.findOne({
        where: { email: res.locals.user.email },
    });
    if (!loggedInUser) {
        res.status(404).json({
            error: `could not find user account matching with email ${res.locals.user.email}`,
        });
        return;
    }
    const userCart = yield loggedInUser.getCart();
    const cartItems = yield userCart.getItems();
    let { domain } = req.body;
    const line_items = [];
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
    const session = yield stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${domain}/orders`,
        cancel_url: `${domain}?canceled=true`,
        customer_email: res.locals.user.email,
    });
    res.json({ id: session.id });
});
export const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = yield User.findOne({
            where: { email: res.locals.user.email },
        });
        if (!loggedInUser) {
            res.status(404).json({
                error: `could not find user account matching with email ${res.locals.user.email}`,
            });
            return;
        }
        const cart = yield loggedInUser.getCart();
        const items = yield cart.getItems();
        const order = yield loggedInUser.createOrder();
        // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
        yield order.addItems(items);
        yield cart.setItems([]); //clear user's cart after order is placed
        const updatedItems = yield cart.getItems();
        console.log(updatedItems);
        res.status(201).redirect('/orders');
    }
    catch (error) {
        console.log(error);
    }
});
export const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = yield User.findOne({
            where: { email: res.locals.user.email },
        });
        if (!loggedInUser) {
            res.status(404).json({
                error: `could not find user account matching with email ${res.locals.user.email}`,
            });
            return;
        }
        const orders = yield loggedInUser.getOrders({
            include: ['items'],
        }); // tells sequelize to also load all items associated with each order
        res.send(orders);
    }
    catch (error) {
        console.log(error);
    }
});
