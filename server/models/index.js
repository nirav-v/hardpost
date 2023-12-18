// const User = require("./User");
// const Item = require("./Item");
// const Cart = require("./Cart");
// const CartItem = require("./Cart-Item");
// const Order = require("./Order");
// const OrderItem = require("./Order-Item");
// const Comment = require("./Comment");
import User from "./User.js";
import Item from "./Item.js";
import Cart from "./Cart.js";
import CartItem from "./Cart-Item.js";
import Order from "./Order.js";
import OrderItem from "./Order-Item.js";
import Comment from "./Comment.js";

// define model associations
Item.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Item); // users and items have a one to many association
User.hasOne(Cart); // One to one relation between a Cart and User
Cart.belongsTo(User);
Cart.belongsToMany(Item, { through: CartItem });
Item.belongsToMany(Cart, { through: CartItem }); // many to many relation between Cart and Item, junction table is CartItem
Order.belongsTo(User); // one-to-many relation between users and orders
User.hasMany(Order);
Order.belongsToMany(Item, { through: OrderItem }); // sets many-to-many relationship between Orders and Items
Item.belongsToMany(Order, { through: OrderItem });

User.hasMany(Comment);
Comment.belongsTo(User);
Item.hasMany(Comment);

// export as an object with all models as properties
// module.exports = { User, Item, Cart, CartItem, Order, OrderItem };
export { User, Item, Cart, CartItem, Order, OrderItem, Comment };
