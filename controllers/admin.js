const router = require("express").Router();
const User = require("../models/User");
const Item = require("../models/Item");
const Cart = require("../models/Cart");
const CartItem = require("../models/Cart-Item");

router.post("/add-item", async (req, res, next) => {
  const { name, category, price, description, image } = req.body;
  const userId = req.user.id; // add the id of the  logged in user to as the userId foreign key
  const item = await Item.create({
    name,
    category,
    price,
    description,
    image,
    userId,
  });
  res.json(item);
});

router.post("/edit-item", async (req, res, next) => {
  // construct a new item object from the arguments passed through the req.body
  // - should receive id, name, category, price, description, image
  const { id, name, category, price, description, image } = req.body;
  // return row from database as an Item object and re-assign its properties to our updated data
  const updatedItem = await Item.findByPk(id);
  updatedItem.userId = req.user.id;
  updatedItem.id = id;
  updatedItem.name = name;
  updatedItem.category = category;
  updatedItem.price = price;
  updatedItem.description = description;
  updatedItem.image = image;
  // call the save method on the created item which will know to replace the existing item with the same id
  updatedItem.save();
  res.json(updatedItem);
});

router.post("/delete-item", async (req, res, next) => {
  const itemId = req.body.id;
  // get all items of the logged in user and find one where the id is in the req.body
  const userItems = await req.user.getItems();
  for (item of userItems) {
    if (item.id === itemId) {
      const deletedItem = await item.destroy();
      return res.json(deletedItem);
    }
  }
  res.send("cannot find item with that id");
});

router.get("/cart", async (req, res, next) => {
  const cart = await req.user.getCart(); //magic method from one to one association between User and Cart
  const cartItems = await cart.getItems(); //magic method from many to many association between Cart and Item
  // console.log(cart);
  res.json(cartItems);
});

// adding item to cart
router.post("/cart", async (req, res, next) => {
  const itemId = req.body.itemId;
  const cart = await req.user.getCart(); // fetch the users cart
  let itemQuantity = 1; // default the quantity to one for cases where item is not in cart
  const existingItems = await cart.getItems({
    where: { id: itemId }, //should return array of of one or zero items in cart with that id
  });
  // for updating quantity of an existing cart item
  if (existingItems.length > 0) {
    const currentQuantity = existingItems[0].cartItem.quantity;
    itemQuantity = currentQuantity + 1;
  }
  // find the item and add it with a the correct quantity
  const itemToAdd = await Item.findByPk(itemId);
  const addedItem = await cart.addItem(itemToAdd, {
    through: { quantity: itemQuantity },
  }); // specify value for extra fields that were created in the cart-item junction table
  // respond with the updated cart items
  res.redirect("/api/cart");
});

router.post("/cart/delete-item", async (req, res, next) => {
  const itemId = req.body.id;
  const cart = await req.user.getCart(); // get the users cart
  const cartItems = await cart.getItems({ where: { id: itemId } }); // get items from user's cart matching the req body id - returns array of matching items
  // delete that item from the cartItems table
  if (cartItems.length > 0) {
    const deletedItem = await cartItems[0].cartItem.destroy();
  }
  res.redirect("/api/cart");
});

module.exports = router;
