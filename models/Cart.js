const fs = require("fs");
const path = require("path");

const p = path.join(process.cwd(), "database", "cart.json");

// cart class has methods for getting all cart items, adding item to cart, and removing item from cart
module.exports = class Cart {
  static addItem(id, price) {
    // read in the cart data, find out if the item already exists, if so increase qty, else add item to cart with qty 1
    fs.readFile(p, (err, data) => {
      let cart = { items: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      console.log(cart);
      // copy the previous cart
      const updatedCart = { ...cart };
      const existingItemIndex = updatedCart.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = updatedCart.items[existingItemIndex];
      if (existingItem) {
        updatedCart.items[existingItemIndex].qty += 1;
        updatedCart.totalPrice += price;
      } else {
        updatedCart.items.push({ id, qty: 1 });
        updatedCart.totalPrice += price;
      }
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static deleteItem(id) {
    // read in the cart data
    // find item in cart with matching id, filter items to a new array without that item

    fs.readFile(p, (err, data) => {
      const cart = JSON.parse(data);
      const updatedCart = { ...cart };
      const updatedItems = updatedCart.items.filter((item) => item.id !== id);
      updatedCart.items = updatedItems;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static getCart(cb) {
    // read in cart json file
    fs.readFile(p, (err, data) => {
      if (err) {
        cb(null);
      } else {
        cb(data);
      }
    });
  }
};
