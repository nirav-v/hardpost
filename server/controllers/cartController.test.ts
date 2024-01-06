import { User } from "../models";
import { getUserCart } from "./cartController";
import jwt from "jsonwebtoken";
import { mockUsers } from "./mockData";
import { mockItems } from "./mockData";

describe("cart controller", () => {
  //   can mock each of the classes exported from models
  jest.mock("../models", () => {
    return {
      User: jest.fn().mockImplementation(() => {
        return {
          findAll: () => {
            console.log("in mock User method");
            return mockUsers;
          },
          findOne: (filter) => mockUsers[0],
          getCart: () => ({
            id: 1,
            createdAt: "2023-10-21T20:05:31.000Z",
            updatedAt: " 2023-10-21T20:05:31.000Z",
            userId: 1,
            getItems: () => mockItems,
          }),
        };
      }),
    };
  });

  test("res.json returns items from the user's cart", async () => {
    const req = {
      headers: {
        authorization: "fake user jwt",
      },
    };

    const res = {
      status: jest.fn().mockImplementation((code) => res),
      send: jest.fn(),
      json: jest.fn(),
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
    findOneUser.mockImplementation(
      () => new Promise((res) => res(mockUsers[0]))
    );

    await getUserCart(req, res);
    expect(res.json).toHaveBeenCalledWith(mockItems);
  });
});
