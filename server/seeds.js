import sequelize from './config/database.js';
import {
  User,
  Item,
  Cart,
  CartItem,
  Order,
  OrderItem,
} from './models/index.js';

const userData = [
  {
    username: 'nirav',
    email: 'nirav@mail.com',
    password: 'password',
  },
  {
    username: 'Birry',
    email: 'B@mail.com',
    password: 'password',
  },
  {
    username: 'tony_H',
    email: 'tony@mail.com',
    password: 'password',
  },
];

const itemData = [
  {
    name: 'Limosine - Cyrus Bennet board',
    category: 'decks',
    price: 15,
    description:
      'Only skated for a couple days, has a small chip at bottom of tail',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/limo-cyrus.jpgee7eaccd026289d83e637253bf86c91983f1ac80cae84ebc7bd9a73115c6c3f0',
    sold: false,
    userId: 2,
  },
  {
    name: 'Thunder trucks',
    category: 'trucks',
    price: 15,
    description: 'size 148 for 8.25 board',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/IMG_6972.jpegf03ad37529961436179e14160259208c9b09b1d699420797600d1d8d06d1a63b',
    sold: false,
    userId: 1,
  },
  {
    name: 'Converse - Fastbreak Sage colorway',
    category: 'shoes',
    price: 35,
    description:
      'Size 8 in Mens. Skated these for a day so slight kickflip wear on right toe. ',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/cons-fastbreak.jpege1a1c40b27b2d309bd22509d8a8a9593b63fcae103617d80e4b75e3d80b955db',
    sold: false,
    userId: 1,
  },
  {
    name: 'Brand New Spitfire Wheels',
    category: 'wheels',
    price: 30,
    description: '54mm, Formula 4 Conical Full Shape',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/spitfiref4wheels.jpgc72db95f4bccab00dc7e37d8304891d3b2f87da197261c704e6b8687e778b288',
    sold: false,
    userId: 1,
  },
  {
    name: 'Numbers Miles Silvas deck',
    category: 'decks',
    price: 10,
    description: 'Moderate wear, no chips or razor tail',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/numbersMilesSilvasdeck.jpg8a890bd3118e5751ad197dbe78e5665a381cca106ecd06f8d04c82cacb131322',
    sold: false,
    userId: 3,
  },
  {
    name: 'Real - Mason Silva deck',
    category: 'decks',
    price: 15,
    description: 'Moderate wear, no chips or razor tail',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpga8e313f43991c035daa2873b0b7e9b0052fc980ab42fad8e2da0c7657cb3a31c',
    sold: false,
    userId: 1,
  },
  {
    name: 'Butter Goods corduroy pants',
    category: 'pants',
    price: 35,
    description: '32" waist, very baggy fit',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/IMG_6902+2.JPGbe69507a69b812c567dbd91fce0674c1402bf4979d86442cc619352ca2d25341',
    sold: false,
    userId: 3,
  },
];

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // add a cart for every user
  for (const user of users) {
    await user.createCart();
  }

  const items = await Item.bulkCreate(itemData);

  process.exit(0);
};

seedDB();
