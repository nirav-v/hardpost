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
import { validateLocalCartItems } from '../util/cartUtil.js';
export const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, cart: localCart } = req.body;
        //   check if user exists already
        const existingUser = yield User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (existingUser) {
            return res.status(401).send({ error: 'account already exists' });
        }
        const newUser = yield User.create({
            username,
            email,
            password,
        });
        // create a cart to associate with the new user
        const userCart = yield newUser.createCart();
        // add items to the users cart
        const dbItems = yield Item.findAll();
        const validCartItems = validateLocalCartItems({
            localCart,
            dbItems,
            loggedInUser: newUser,
        });
        const cartPromises = [];
        validCartItems.forEach(
        // build array of db promises for adding valid items to cart
        cartItem => cartPromises.push(userCart.addItem(cartItem.id)));
        // wait for all items to be added to the users cart
        yield Promise.all(cartPromises);
        // create jwt
        const token = jwt.sign({ username, email, userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        return res.status(201).json(token);
    }
    catch (error) {
        console.error(error);
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, cart: localCart } = req.body;
        console.log(JSON.stringify(req.body, null, 2));
        // check db for matching username
        const existingUser = yield User.findOne({
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
        const token = jwt.sign({
            username: existingUser.username,
            email: existingUser.email,
            userId: existingUser.id,
        }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });
        const userCart = yield existingUser.getCart();
        const dbItems = yield Item.findAll();
        const validCartItems = validateLocalCartItems({
            localCart,
            dbItems,
            loggedInUser: existingUser,
        });
        const cartPromises = [];
        validCartItems.forEach(
        // build array of db promises for adding valid items to cart
        cartItem => cartPromises.push(userCart.addItem(cartItem.id)));
        // wait for all items to be added to the users cart
        yield Promise.all(cartPromises);
        return res.status(200).json(token);
    }
    catch (error) {
        console.error(error);
    }
});
export const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get logged in user's data
        const user = yield User.findOne({
            where: { id: res.locals.user.userId },
            include: [Cart, Item],
        });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
