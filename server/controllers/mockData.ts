type MockUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type MockItemType = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imagePath: string;
  sold: boolean;
  userId: number;
  user: MockUserType;
};

export class MockUser {
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

  create() {
    return mockUsers[0];
  }

  findAll() {
    return new Promise(res => res(mockItems));
  }

  findOne() {
    return new Promise(res => res(mockUsers[0]));
  }

  getCart() {
    return new Promise(res => res(mockCart));
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
}

export class MockItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imagePath: string;
  userId: number;
  user: MockUserType;

  constructor({
    id,
    name,
    category,
    price,
    description,
    imagePath,
    userId,
    user,
  }: MockItemType) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.imagePath = imagePath;
    this.userId = userId;
    this.user = user;
  }

  findAll() {
    new Promise(res => res(mockItems));
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
    password: 'password',
  }),
];

export const mockItems = [
  new MockItem({
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
  }),

  new MockItem({
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
  }),
];
