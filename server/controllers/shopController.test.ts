import Item from '../models/Item';
import { getItemById, getShopItems } from './shopController';
import { mockItems } from './mockData';
import { Request } from 'express';

describe('Item controller logic', () => {
  const req = {};
  const res = {
    status: jest.fn().mockImplementation(statusCode => res),
    json: jest.fn(),
  };
  test('getShopItems returns items in json format', async () => {
    // jest.fn() returns a mock function

    Item.findAll = jest.fn().mockResolvedValue(mockItems);

    await getShopItems(req as Request, res);

    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  test('getITemById returns item in json format', async () => {
    const req = { params: { itemId: 1 } };

    let foundItem;
    // mock the sequelize method's return value
    Item.findByPk = jest.fn().mockImplementation(id => {
      foundItem = mockItems.find(item => item.id === id);
      return new Promise((res, rej) => res(foundItem));
    });

    await getItemById(req as unknown as Request, res);

    expect(res.json).toHaveBeenCalledWith(foundItem);
  });
});
