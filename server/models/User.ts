import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
  CreationOptional,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';
import Cart from './Cart.js';
import Item from './Item.js';
import Order from './Order.js';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare password: string;
  declare email: string;
  declare username: string;
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // typing all the association magic methods for a User
  // user cart methods
  declare createCart: HasOneCreateAssociationMixin<Cart>;
  declare getCart: HasOneGetAssociationMixin<Cart>;
  // user item methods
  declare getItems: HasManyGetAssociationsMixin<Item>;
  // user order methods
  declare getOrders: HasManyGetAssociationsMixin<Order>;
  // instance method for verifying password with
  checkPassword(loginPw: string) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // only allow passwords between 6 - 30 chars long
        len: [6, 30],
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate: async newUserData => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // return newUserData; -> pissed off sequelize HookReturn type
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
  }
);

// module.exports = User;
export default User;
