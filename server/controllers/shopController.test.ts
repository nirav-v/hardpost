import Item from "../models/Item.js";
import { getItemById, getShopItems } from "./shopController.js";
import { mockItems } from "./mockData";

describe("Item controller logic", () => {
  test("getShopItems returns items in json format", async () => {
    // jest.fn() returns a mock function

    Item.findAll = jest.fn().mockResolvedValue(mockItems);

    const req = {};
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    await getShopItems(req, res);

    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  test("getITemById returns item in json format", async () => {
    const req = { params: { itemId: 1 } };
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };

    let foundItem;
    // mock the sequelize method's return value
    Item.findByPk = jest.fn().mockImplementation((id) => {
      foundItem = mockItems.find((item) => item.id === id);
      return new Promise((res, rej) => res(foundItem));
    });

    await getItemById(req, res);

    expect(res.json).toHaveBeenCalledWith(foundItem);
  });
});
