const router = require("express").Router();
const { Item } = require("../../models/");

router.get("/get-items", async (req, res) => {
  // find all items that have a userId matching req.session.userId
  const userItems = await Item.findAll({
    where: { userId: req.session.userId },
  });
  res.status(200).send({ userItems: userItems });
});

router.post("/add-item", async (req, res, next) => {
  if (!req.session.userId)
    return res
      .status(401)
      .send({ error: "you must be logged in to create a new item" });

  const { name, category, price, description, image } = req.body;
  const userId = req.session.userId; // add the id of the  logged in user as the items userId foreign key
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
  updatedItem.userId = req.session.userId;
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
