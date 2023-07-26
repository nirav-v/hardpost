const sequelize = require("./config/database");
const User = require("./models/User");

const usersData = [
  {
    username: "User 1",
    email: "user1@example.com",
    password: "password1",
  },
  {
    username: "User 2",
    email: "user2@example.com",
    password: "password2",
  },
  {
    username: "User 3",
    email: "user3@example.com",
    password: "password3",
  },
];

const seedDB = async () => {
  await sequelize.sync();

  const users = await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDB();
