import { Request, Response } from 'express';
import { Item, User } from '../models/index.js';
import { Op } from 'sequelize';

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
  const { searchTerm } = req.params;

  const items = await Item.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${searchTerm}%` } },
        { description: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });

  res.json({ items });
};
