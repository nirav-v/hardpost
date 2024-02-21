import { Request, Response } from 'express';
import { Item, User } from '../models/index.js';

export const getShopItems = async (req: Request, res: Response) => {
  try {
    let items = await Item.findAll({ include: User });

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const item = await Item.findByPk(req.params.itemId);
  res.status(200).json(item);
};

export const getItemBySearchParam = async (req: Request, res: Response) => {
  console.log(req.params);
};
