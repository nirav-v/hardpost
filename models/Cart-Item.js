const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "cart-item", // We need to choose the model name
  }
);

module.exports = CartItem;
