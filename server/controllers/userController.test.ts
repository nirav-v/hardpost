import { checkIfCartItemExists } from './userController';
import { mockItems } from './mockData';

describe('user controller tests', () => {
  test('util function correctly verifies if a local cart item has already been deleted from the database', () => {
    const localCartItem = {
      id: 1,
      name: 'real mason silva ',
      category: 'decks',
      price: 34234,
      description: 'gae',
      imagePath:
        'https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpga8e313f43991c035daa2873b0b7e9b0052fc980ab42fad8e2da0c7657cb3a31c',
      sold: false,
      userId: 1,
      user: {
        id: 1,
        username: 'nirav',
        email: 'nirav@mail.com',
        password:
          '$2b$10$i6yloJad9M3Hzrs8oVXMHeMnLOjKhgo/9lIvYsGyO20prOU.e53XW',
      },
    };

    expect(checkIfCartItemExists(localCartItem, mockItems)).toBe(true);
  });
});
