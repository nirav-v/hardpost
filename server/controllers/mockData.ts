type MockUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class MockUser {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor({ id, username, email, password }: MockUserType) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getItems() {
    return new Promise(res => res(mockItems));
  }

  addItem() {
    return new Promise(res => res);
  }

  checkPassword(p1: string, p2: string) {
    return p1 === p2;
  }

  getCart() {
    return new Promise(res => res(mockCart));
  }
}

export const mockCart = {
  id: 1,
  createdAt: '2023-10-21T20:05:31.000Z',
  updatedAt: ' 2023-10-21T20:05:31.000Z',
  userId: 1,
  getItems: () => mockItems,
  addItem: () => new Promise(res => res),
};

export const mockUsers: MockUserType[] = [
  new MockUser({
    id: 4,
    username: 'nirav',
    email: 'nirav@mail.com',
    password: 'password',
  }),
  new MockUser({
    id: 8,
    username: 'bo',
    email: 'bo@mail.com',
    password: '$2b$10$yIsKTlyky1QY0ITtezOg8.9HsVT7iM/Rot.2FdFxTj2LkSrzVc4/O',
  }),
];

export const mockItems = [
  {
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
      password: '$2b$10$i6yloJad9M3Hzrs8oVXMHeMnLOjKhgo/9lIvYsGyO20prOU.e53XW',
    },
  },
  {
    id: 16,
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
      password: '$2b$10$i6yloJad9M3Hzrs8oVXMHeMnLOjKhgo/9lIvYsGyO20prOU.e53XW',
    },
  },
];
