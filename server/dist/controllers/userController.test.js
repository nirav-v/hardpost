var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkIfCartItemExists, loginUser, signUpUser } from './userController';
import { mockItems, mockUsers } from './mockData';
import { Item, User } from '../models';
import jwt from 'jsonwebtoken';
describe('checking if local cart item still exists', () => {
    test('util function correctly verifies if a cart item exists in the amongst an array of items', () => {
        const localCartItem = mockItems[0];
        expect(checkIfCartItemExists(localCartItem, mockItems)).toBe(true);
    });
    test('util function returns false if passed an item not in the items array', () => {
        const invalidCartItem = Object.assign(Object.assign({}, mockItems[0]), { id: 34532985734957 });
        expect(checkIfCartItemExists(invalidCartItem, mockItems)).toBe(false);
    });
});
describe('user controller tests', () => {
    beforeEach(() => {
        jest
            .spyOn(User, 'findOne')
            .mockImplementation(() => new Promise(res => res(mockUsers[0])));
        jest
            .spyOn(User, 'create')
            .mockImplementation(() => new Promise(res => res(mockUsers[0])));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'fake jwt');
        jest
            .spyOn(Item, 'findAll')
            .mockImplementation(() => new Promise(res => res(mockItems)));
    });
    // MOCKS -----------
    const req = {
        body: {
            email: 'nirav@mail.com',
            password: 'password',
            cart: [...mockItems], // local storage cart sent with request
        },
    };
    const res = {
        status: jest.fn().mockImplementation(code => res),
        send: jest.fn(),
        json: jest.fn(),
        redirect: jest.fn(),
    };
    // TESTS ----------------
    test('login controller calls res.json with a jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign();
        yield loginUser(req, res);
        expect(res.json).toHaveBeenCalledWith(token);
    }));
    test('sign up controller calls res.json with a jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign();
        yield signUpUser(req, res);
        expect(res.json).toHaveBeenCalledWith(token);
    }));
    afterEach(() => {
        jest.restoreAllMocks();
    });
});
