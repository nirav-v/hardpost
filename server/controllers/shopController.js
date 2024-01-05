import { Item, User } from "../models/index.js";

export const getShopItems = async (req, res) => {
  try {
    let items = await Item.findAll({ include: User });

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

export const getItemById = async (req, res) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
};
