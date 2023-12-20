// const router = require("express").Router();
// const { Item, User } = require("../models");
import { Router } from "express";
import { getShopItems, getItemById } from "../controllers/shopController.js";
const router = Router();

// route for showing all items listed
router.get("/shop", getShopItems);

router.get("/shop/:itemId", getItemById);

export default router;
