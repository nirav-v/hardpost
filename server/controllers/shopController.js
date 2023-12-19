import { Item, User } from "../models/index.js";

export const getShopItems = async (req, res, next) => {
  try {
    let items = await Item.findAll({ include: User });
    res.send(items);
  } catch (err) {
    console.log(err);
  }
};
