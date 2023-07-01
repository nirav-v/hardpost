const router = require("express").Router();
const itemRoutes = require("./itemRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");
const userRoutes = require("./userRoutes");

router.use(itemRoutes);
router.use(orderRoutes);
router.use(cartRoutes);
router.use("/user", userRoutes);

module.exports = router;
