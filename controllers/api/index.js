const router = require("express").Router();
const itemRoutes = require("./itemRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");

router.use(itemRoutes);
router.use(orderRoutes);
router.use(cartRoutes);

module.exports = router;
