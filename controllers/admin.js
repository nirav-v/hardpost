const router = require("express").Router();
const Item = require("../models/Item");
const Cart = require("../models/Cart");

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

router.get("/cart", async (req, res, next) => {
  const cart = await req.user.getCart(); //magic method from one to one association between User and Cart
  const cartItems = await cart.getItems(); //magic method from many to many association between Cart and Item
  // console.log(cart);
  res.json(cartItems);
});

// adding item to cart
router.post("/cart", async (req, res, next) => {
  const itemId = req.body.itemId;
  const cart = await req.user.getCart();
  // for updating quantity of an existing cart item
  const items = await cart.getItems({
    where: { id: itemId }, //returns array of item in cart with that id
  });
  // for adding a new item
  const newItem = await Item.findByPk(itemId);
  cart.addItem(newItem, { through: { quantity: 1 } });
  res.json(newItem);
});

router.post("/cart/delete-item", (req, res, next) => {
  const itemId = req.body.id;
  Cart.deleteItem(itemId);
  res.send(itemId);
});

module.exports = router;
