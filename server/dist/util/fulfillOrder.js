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
export const fulfillOrder = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = yield User.findOne({ where: { email: userEmail } });
        if (!loggedInUser)
            throw new Error(`cannot find a user with this email ${userEmail}`);
        const userCart = yield loggedInUser.getCart();
        const cartItems = yield userCart.getItems();
        const order = yield loggedInUser.createOrder();
        // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
        yield order.addItems(cartItems);
        yield userCart.setItems([]); //clear user's cart after order is placed
        // mark all items from the cart as sold
        for (let item of cartItems) {
            Item.update({ sold: true }, { where: { id: item.id } });
        }
    }
    catch (error) {
        console.log(error);
    }
});
