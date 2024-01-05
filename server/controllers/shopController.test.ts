import Item from "../models/Item.js";
import { getItemById, getShopItems } from "./shopController.js";

const mockItems = [
  {
    id: 1,
    name: "real mason silva ",
    category: "decks",
    price: 34234,
    description: "gae",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpga8e313f43991c035daa2873b0b7e9b0052fc980ab42fad8e2da0c7657cb3a31c",
    sold: false,
    userId: 1,
    user: {
      id: 1,
      username: "nirav",
      email: "nirav@mail.com",
      password: "$2b$10$i6yloJad9M3Hzrs8oVXMHeMnLOjKhgo/9lIvYsGyO20prOU.e53XW",
    },
  },
  {
    id: 16,
    name: "real mason silva ",
    category: "decks",
    price: 34234,
    description: "gae",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpga8e313f43991c035daa2873b0b7e9b0052fc980ab42fad8e2da0c7657cb3a31c",
    sold: false,
    userId: 1,
    user: {
      id: 1,
      username: "nirav",
      email: "nirav@mail.com",
      password: "$2b$10$i6yloJad9M3Hzrs8oVXMHeMnLOjKhgo/9lIvYsGyO20prOU.e53XW",
    },
  },
];

describe("Item controller logic", () => {
  test("getShopItems returns items in json format", async () => {
    // jest.fn() returns a mock function

    Item.findAll = jest.fn().mockResolvedValue(mockItems);

    const req = {};
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getShopItems(req, res);

    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  test("getITemById returns item in json format", async () => {
    const req = { params: { itemId: 1 } };
    const res = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    };
    const next = jest.fn();

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
