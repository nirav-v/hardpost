const router = require("express").Router();
const Item = require("../models/Item");
const Cart = require("../models/Cart");

router.post("/add-item", async (req, res, next) => {
  console.log(req.body);
  const { name, category, price, description, image } = req.body;
  const item = await Item.create({ name, category, price, description, image });
  res.json(item);
});

router.post("/edit-item", async (req, res, next) => {
  // construct a new item object from the arguments passed through the req.body
  // - should receive id, name, category, price, description, image
  const { id, name, category, price, description, image } = req.body;
  // return row from database as an Item object and re-assign its properties to our updated data
  const updatedItem = await Item.findByPk(id);
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

router.get("/cart", (req, res, next) => {
  Cart.getCart((items) => {
    res.send(items);
  });
});

// adding item to cart
router.post("/cart", (req, res, next) => {
  console.log(Cart);
  const itemId = req.body.id;
  Item.findById(itemId, (item) => {
    Cart.addItem(itemId, item.price);
    res.send(`Added: ${JSON.stringify(item)}`);
  });
});

router.post("/cart/delete-item", (req, res, next) => {
  const itemId = req.body.id;
  Cart.deleteItem(itemId);
  res.send(itemId);
});

module.exports = router;
