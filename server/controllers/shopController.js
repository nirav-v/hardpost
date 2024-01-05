import { Item, User } from "../models/index.js";

export const getShopItems = async (req, res, next) => {
  try {
    let items = await Item.findAll({ include: User });
    res.json(items);
  } catch (err) {
    console.log(err);
  }
};

export const getItemById = async (req, res, next) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
};
