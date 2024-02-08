// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Item extends Model {
  declare id: number;
  declare userId: number;
  declare name: string;
  declare category: string;
  declare price: number;
  declare description: string;
  declare imagePath: string;
  // added as property on Item returned from cart.getItems
  declare cartItem: Item;
}

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
    imagePath: {
      type: DataTypes.STRING,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    timestamps: false,
    underscored: false,
    modelName: 'item', // We need to choose the model name
  }
);

// the defined model is the class itself
// console.log(Item === sequelize.models.Item); // true

// module.exports = Item;
export default Item;
