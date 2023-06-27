const router = require("express").Router();
const Item = require("../../models/Item");

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

module.exports = router;
