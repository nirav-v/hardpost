import Item from "../models/Item.js";
import { getShopItems } from "./shopController.js";

const mockItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

describe("Item controller logic", () => {
  test("getShopItems returns items in json format", async () => {
    Item.findAll = jest.fn().mockResolvedValue(mockItems);

    const req = {};
    const res = { json: jest.fn() };
    const next = jest.fn();

    await getShopItems(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockItems);
  });
});
