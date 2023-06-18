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

router.get("/shop/:itemId", (req, res, next) => {
  Item.findById(req.params.itemId, (item) => {
    res.send(item);
  });
});

module.exports = router;
