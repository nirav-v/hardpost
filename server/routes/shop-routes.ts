// const router = require("express").Router();
// const { Item, User } = require("../models");
import { Router } from "express";
import { Item, User } from "../models/index.js";
import { getShopItems } from "../controllers/shopController.js";
const router = Router();

// route for showing all items listed
router.get("/shop", getShopItems);

router.get("/shop/:itemId", async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
});

export default router;
