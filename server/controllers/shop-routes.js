const router = require("express").Router();
const Item = require("../models/Item");

// route for showing all items listed
router.get("/shop", async (req, res, next) => {
  try {
    let items = await Item.findAll();
    res.send(items);
  } catch (err) {
    console.log(err);
  }
});

router.get("/shop/:itemId", async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  console.log(item);
  res.status(200).json(item);
});

module.exports = router;
