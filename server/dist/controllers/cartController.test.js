var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Item, User, Cart } from "../models";
import { addCartItem, getUserCart } from "./cartController";
import jwt from "jsonwebtoken";
import { mockCart, mockUsers, mockItems } from "./mockData";
describe("cart controller", () => {
    const req = {
        body: {
            itemId: 1,
        },
        headers: {
            authorization: "fake user jwt",
        },
    };
    const res = {
        status: jest.fn().mockImplementation((code) => res),
        send: jest.fn(),
        json: jest.fn(),
        redirect: jest.fn(),
    };
    const verify = jest.spyOn(jwt, "verify");
    verify.mockImplementation(() => ({
        username: "nirav",
        email: "nirav@mail.com",
        userId: 1,
        iat: 1704497698,
        exp: 1704584098,
    }));
    const findAllUsers = jest.spyOn(User, "findAll");
    findAllUsers.mockImplementation(() => new Promise((res) => res(mockUsers)));
    const findOneUser = jest.spyOn(User, "findOne");
    findOneUser.mockImplementation(() => new Promise((res) => res(mockUsers[0])));
    const findOneItem = jest.spyOn(Item, "findByPk");
    findOneItem.mockImplementation(() => new Promise((resolve) => resolve(mockItems[0])));
    const findCart = jest.spyOn(Cart, "findOne");
    findCart.mockImplementation(() => new Promise((resolve) => resolve(mockCart)));
    const addItem = jest.spyOn(mockCart, "addItem");
    addItem.mockImplementation(() => { });
    test("getCart handler calls res.json with the user's cart", () => __awaiter(void 0, void 0, void 0, function* () {
        yield getUserCart(req, res);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    }));
    test("addCartItem calls the cart.addItem method with new itemId", () => __awaiter(void 0, void 0, void 0, function* () {
        yield addCartItem(req, res);
        expect(mockCart.addItem).toHaveBeenCalled();
    }));
});
