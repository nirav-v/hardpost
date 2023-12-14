// const router = require("express").Router();
// const { Item, User } = require("../models");
import { Router } from "express";
import { Item, User } from "../models/index.js";
const router = Router();

// route for showing all items listed
router.get("/shop", async (req, res, next) => {
  try {
    let items = await Item.findAll({ include: User });
    res.send(items);
  } catch (err) {
    console.log(err);
  }
});

router.get("/shop/:itemId", async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
});

export default router;
