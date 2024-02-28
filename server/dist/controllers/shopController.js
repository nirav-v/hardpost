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
import { Op } from 'sequelize';
export const getShopItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let items = yield Item.findAll({ include: User });
        res.status(200).json(items);
    }
    catch (err) {
        console.log(err);
    }
});
export const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield Item.findByPk(req.params.itemId);
    res.status(200).json(item);
});
export const getItemBySearchParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.params;
    const items = yield Item.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${searchTerm}%` } },
                { description: { [Op.like]: `%${searchTerm}%` } },
            ],
        },
        include: User,
    });
    res.json(items);
});
