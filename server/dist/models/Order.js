// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Model, DataTypes, } from 'sequelize';
import sequelize from '../config/database.js';
// Order will serve as a junction table between Users and the Items they ordered
class Order extends Model {
}
Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    underscored: false,
    modelName: 'order', // We need to choose the model name
});
// module.exports = Order;
export default Order;
