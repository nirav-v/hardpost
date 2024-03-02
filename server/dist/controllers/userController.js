var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Item, User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { checkItemExists, validateLocalCartItems } from '../util/cartUtil.js';
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
        const addCartItems = [];
        const items = yield Item.findAll();
        for (const cartItem of localCart) {
            const validCartItem = checkItemExists(cartItem, items);
            if (validCartItem) {
                // build array of db promises
                addCartItems.push(userCart.addItem(cartItem.id));
            }
        }
        // wait for all items to be added to the users cart
        yield Promise.all(addCartItems);
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
        const addCartItems = [];
        validCartItems.forEach(
        // build array of db promises for adding valid items to cart
        cartItem => addCartItems.push(userCart.addItem(cartItem.id)));
        // wait for all items to be added to the users cart
        yield Promise.all(addCartItems);
        return res.status(200).json(token);
    }
    catch (error) {
        console.error(error);
    }
});
