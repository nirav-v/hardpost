// const { Sequelize, DataTypes, Model } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

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
    modelName: "cartItem", // We need to choose the model name
  }
);

// module.exports = CartItem;
export default CartItem;
