// const router = require("express").Router();
// const itemRoutes = require("./itemRoutes");
// const orderRoutes = require("./orderRoutes");
// const cartRoutes = require("./cartRoutes");
// const userRoutes = require("./userRoutes.js");
import { Router } from "express";
import itemRoutes from "./itemRoutes.js";
import orderRoutes from "./orderRoutes.js";
import cartRoutes from "./cartRoutes.js";
import userRoutes from "./userRoutes.js";
const router = Router();

router.use(itemRoutes);
router.use(orderRoutes);
router.use(cartRoutes);
router.use("/user", userRoutes);

// module.exports = router;
export default router;
