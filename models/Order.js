const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

class Order extends Model {}

Order.init(
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
    underscored: false,
    modelName: "order", // We need to choose the model name
  }
);
