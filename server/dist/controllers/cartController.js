var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Cart, Item, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import Auth from '../util/serverAuth.js';
export const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            return res.status(401).send({
                unauthorized: 'no token provided in headers, please log in first',
            });
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("payload: ", payload);
        const loggedInUser = yield User.findOne({
            where: { email: payload.email },
        });
        if (loggedInUser) {
            const cart = yield loggedInUser.getCart();
            const cartItems = yield cart.getItems(); //magic method from many to many association between Cart and Item
            // console.log(cartItems);
            res.json(cartItems);
        }
        else {
            res.send('not logged in');
        }
    }
    catch (err) {
        console.log(err);
    }
});
export const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);
    const loggedInUser = yield User.findOne({
        where: { email: payload.email },
    });
    const cart = yield Cart.findOne({
        where: {
            userId: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id,
        },
    }); // fetch the users cart
    const itemId = req.body.itemId;
    let itemQuantity = 1; // default the quantity to 1
    // find the item and add it with a the correct quantity
    const itemToAdd = yield Item.findByPk(itemId);
    if (itemToAdd) {
        yield (cart === null || cart === void 0 ? void 0 : cart.addItem(itemToAdd)); // specify value for extra fields that were created in the cart-item junction table
    }
    // respond with the updated cart items
    res.redirect('/api/cart');
});
export const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Auth.verifyToken(req.headers, process.env.JWT_SECRET);
    const loggedInUser = yield User.findOne({ where: { email: payload.email } });
    const itemId = req.body.itemId;
    const cart = yield (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.getCart()); // get the users cart
    const cartItems = yield (cart === null || cart === void 0 ? void 0 : cart.getItems({ where: { id: itemId } })); // get items from user's cart matching the req body id - returns array of matching items
    // delete that item from cartItems table
    console.log(cartItems);
    if (cartItems && cartItems.length > 0) {
        const deletedItem = yield cartItems[0].cartItem.destroy();
    }
    res.redirect('/api/cart');
});
