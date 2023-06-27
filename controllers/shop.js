const router = require("express").Router();
const Item = require("../models/Item");

// route for showing all items listed
router.get("/shop", (req, res, next) => {
  Item.findAll()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => console.log(err));
});

router.get("/shop/:itemId", async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  res.json(item);
});

module.exports = router;
