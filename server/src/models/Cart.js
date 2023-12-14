// const { Sequelize, DataTypes, Model } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "cart", // We need to choose the model name
  }
);

// module.exports = Cart;
export default Cart;
