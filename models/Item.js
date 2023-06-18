const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class Item extends Model {}

Item.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Item", // We need to choose the model name
  }
);

// the defined model is the class itself
// console.log(Item === sequelize.models.Item); // true

module.exports = Item;
