// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    underscored: false,
    modelName: "orderItem", // We need to choose the model name
  }
);

// module.exports = OrderItem;
export default OrderItem;
