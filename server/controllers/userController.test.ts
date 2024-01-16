import { checkIfCartItemExists, loginUser } from './userController';
import { mockItems, mockUsers } from './mockData';
import { Item, User } from '../models';
import jwt from 'jsonwebtoken';

describe('checks if cart item exists in an array of items', () => {
  test('util function correctly verifies if a local cart item still exists in the database items', () => {
    const localCartItem = mockItems[0];

    expect(checkIfCartItemExists(localCartItem, mockItems)).toBe(true);
  });

  test('checkIfCartItemExists util function returns false if passed an invalid item', () => {
    const invalidCartItem = { ...mockItems[0], id: 34532985734957 };

    expect(checkIfCartItemExists(invalidCartItem, mockItems)).toBe(false);
  });
});

describe('user controller tests', () => {
  // MOCKS -----------
  const res = {
    status: jest.fn().mockImplementation(code => res),
    send: jest.fn(),
    json: jest.fn(),
    redirect: jest.fn(),
  };

  jest
    .spyOn(User, 'findOne')
    .mockImplementation(() => new Promise(res => res(mockUsers[0])));

  jest.spyOn(jwt, 'sign').mockImplementation(() => 'fake jwt');

  jest
    .spyOn(Item, 'findAll')
    .mockImplementation(() => new Promise(res => res(mockItems)));

  // TESTS ----------------
  test('user login controller logic', async () => {
    const req = {
      body: {
        email: 'nirav@mail.com',
        password: 'password',
        cart: [...mockItems], // local storage cart sent with request
      },
    };

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith(jwt.sign());
  });
});
