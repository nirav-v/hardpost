const sequelize = require("./config/database");
const { User, Item, Cart, CartItem, Order, OrderItem } = require("./models");

const userData = [
  {
    username: "nirav",
    email: "nirav@mail.com",
    password: "password",
  },
  {
    username: "Birry",
    email: "B@mail.com",
    password: "password",
  },
  {
    username: "User 3",
    email: "user3@mail.com",
    password: "password3",
  },
];

const itemData = [
  {
    name: "Limosine - Cyrus Bennet board",
    category: "decks",
    price: 20,
    description:
      "Only skated for a couple days, has a small chip at bottom of tail",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/limo-cyrus.jpg169d6a465247dfaf170d1581c02a1b270b093776a2b8910304cefad9e14c5fd7",
    sold: false,
    userId: 2,
  },
  {
    name: "Converse - Fastbreak Sage colorway",
    category: "shoes",
    price: 35,
    description:
      "Size 8 in Mens. Skated these for a day so slight kickflip wear on right toe. ",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/cons-fastbreak.jpegb986746666956edbb5a107c699b7bf41c8089b8b71a8874f349613a1b12f6abc",
    sold: false,
    userId: 1,
  },
  {
    name: "Brand New Spitfire Wheels",
    category: "wheels",
    price: 30,
    description: "54mm, Formula 4 Conical Full Shape",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/spitfiref4wheels.jpg4f00b35e787dfeb151a411b7e3c99d77bb69ad60dbfd6451bbfc244514b94fe4",
    sold: false,
    userId: 1,
  },
  {
    name: "Numbers Miles Silvas deck",
    category: "decks",
    price: 10,
    description: "Moderate wear, no chips or razor tail",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpg855febf05f4f6b79f2c21c4eff03297d6c4e9ac2cd7631dec3954ece0b2e3dd4",
    sold: false,
    userId: 2,
  },
  {
    name: "Real - Mason Silva deck",
    category: "decks",
    price: 10,
    description: "Moderate wear, no chips or razor tail",
    imagePath:
      "https://public-hardpost-bucket.s3.amazonaws.com/real-mason-deck.jpg855febf05f4f6b79f2c21c4eff03297d6c4e9ac2cd7631dec3954ece0b2e3dd4",
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
