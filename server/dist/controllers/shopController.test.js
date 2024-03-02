var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Item from '../models/Item';
import { getItemById, getShopItems } from './shopController';
import { mockItems } from './mockData';
describe('Item controller logic', () => {
    const req = {};
    const res = {
        status: jest.fn().mockImplementation(statusCode => res),
        json: jest.fn(),
    };
    test('getShopItems returns items in json format', () => __awaiter(void 0, void 0, void 0, function* () {
        // jest.fn() returns a mock function
        Item.findAll = jest.fn().mockResolvedValue(mockItems);
        yield getShopItems(req, res);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    }));
    test('getITemById returns item in json format', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { itemId: 1 } };
        let foundItem;
        // mock the sequelize method's return value
        Item.findByPk = jest.fn().mockImplementation(id => {
            foundItem = mockItems.find(item => item.id === id);
            return new Promise((res, rej) => res(foundItem));
        });
        yield getItemById(req, res);
        expect(res.json).toHaveBeenCalledWith(foundItem);
    }));
});
