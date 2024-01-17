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
    const invalidCartItem = { ...mockItems[0], id: 34532985734957 };

    expect(checkIfCartItemExists(invalidCartItem, mockItems)).toBe(false);
  });
});

describe('user controller tests', () => {
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

  jest
    .spyOn(User, 'findOne')
    .mockImplementation(() => new Promise(res => res(mockUsers[0])));

  jest.spyOn(User, 'create').mockImplementation(() => mockUsers[0]);

  jest.spyOn(jwt, 'sign').mockImplementation(() => 'fake jwt');

  const token = jwt.sign();

  jest
    .spyOn(Item, 'findAll')
    .mockImplementation(() => new Promise(res => res(mockItems)));

  // TESTS ----------------
  test('login controller calls res.json with a jwt', async () => {
    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith(token);
  });

  test('sign up controller calls res.json with a jwt', async () => {
    await signUpUser(req, res);
    expect(res.json).toHaveBeenCalledWith(token);
  });
});
