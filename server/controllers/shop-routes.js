const router = require("express").Router();
const { Item, User } = require("../models");

// route for showing all items listed
router.get("/shop", async (req, res, next) => {
  try {
    let items = await Item.findAll({ include: User });
    console.log(items);
    res.send(items);
  } catch (err) {
    console.log(err);
  }
});

router.get("/shop/:itemId", async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
});

module.exports = router;
