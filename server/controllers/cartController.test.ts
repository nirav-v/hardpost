import { Item, User, Cart } from '../models/index';
import { addCartItem, getUserCart } from './cartController';
import jwt from 'jsonwebtoken';
import { mockCart, mockUsers, mockItems } from './mockData';
import { Request } from 'express';

describe('cart controller', () => {
  const req = {
    body: {
      itemId: 1,
    },
    headers: {
      authorization: 'fake user jwt',
    },
  };

  const res = {
    status: jest.fn().mockImplementation(code => res),
    send: jest.fn(),
    json: jest.fn(),
    redirect: jest.fn(),
  };

  const verify = jest.spyOn(jwt, 'verify');
  verify.mockImplementation(() => ({
    username: 'nirav',
    email: 'nirav@mail.com',
    userId: 1,
    iat: 1704497698,
    exp: 1704584098,
  }));

  const findAllUsers = jest.spyOn(User, 'findAll');
  findAllUsers.mockImplementation(
    () => new Promise(res => res(mockUsers as User[]))
  );

  const findOneUser = jest.spyOn(User, 'findOne');
  findOneUser.mockImplementation(
    () => new Promise(res => res(mockUsers[0] as User))
  );

  const findOneItem = jest.spyOn(Item, 'findByPk');
  findOneItem.mockImplementation(
    () => new Promise(resolve => resolve(mockItems[0] as unknown as Item))
  );

  const findCart = jest.spyOn(Cart, 'findOne');
  findCart.mockImplementation(
    () => new Promise(resolve => resolve(mockCart as unknown as Cart))
  );

  const addItem = jest.spyOn(mockCart, 'addItem');
  addItem.mockImplementation(() => new Promise(res => res));

  test("getCart handler calls res.json with the user's cart", async () => {
    await getUserCart(req as Request, res);
    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  test('addCartItem calls the cart.addItem method with new itemId', async () => {
    await addCartItem(req as Request, res);
    expect(mockCart.addItem).toHaveBeenCalled();
  });
});
