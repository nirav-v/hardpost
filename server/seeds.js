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
];

const itemData = [
  {
    name: 'Limosine - Cyrus Bennet board',
    category: 'decks',
    price: 20,
    description:
      'Only skated for a couple days, has a small chip at bottom of tail',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/limo-cyrus.jpg425e4ca14a84cea7eded38f850f06a35fd2cf4ac26bcd88ae7d1a9539d638657',
    sold: false,
    userId: 2,
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
      'https://public-hardpost-bucket.s3.amazonaws.com/spitfiref4wheels.jpg4f00b35e787dfeb151a411b7e3c99d77bb69ad60dbfd6451bbfc244514b94fe4',
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
    userId: 2,
  },
  {
    name: 'Real - Mason Silva deck',
    category: 'decks',
    price: 10,
    description: 'Moderate wear, no chips or razor tail',
    imagePath:
      'https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpg26bf5193dc1eecebcd2ea130658a2d0d0711734de97b7b9b5d8395ec5ba2cfda',
    sold: false,
    userId: 2,
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
