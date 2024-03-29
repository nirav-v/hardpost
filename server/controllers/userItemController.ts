import { Item, User } from '../models/index.js';

import { uploadFile } from '../util/S3.js';
import { Request, Response } from 'express';

export const uploadItem = async (
  req: Request & { file?: any },
  res: Response
) => {
  console.log('req.file', req.file); // multer adds image data as file field on req object

  try {
    const loggedInUser = await User.findOne({
      where: { email: res.locals.user.email },
    });

    // upload file using the util function from s3 sdk
    const uploadedFile = await uploadFile(req.file);

    console.log(uploadedFile);

    const { name, category, price, description } = req.body;
    const userId = loggedInUser?.id; // add the id of the  logged in user as the items userId foreign key
    const item = await Item.create({
      name,
      category,
      price,
      description,
      imagePath: `https://public-hardpost-bucket.s3.amazonaws.com/${uploadedFile.filename}`, // store path to the image in the database
      userId,
    });
    res.json({ createdItem: item });
  } catch (err) {
    console.log(err, 'something went wrong');
  }
};

export const editItem = async (req: Request, res: Response) => {
  // construct a new item object from the arguments passed through the req.body
  // - should receive id, name, category, price, description, image
  const { id, name, category, price, description, image } = req.body;
  // return row from database as an Item object and re-assign its properties to our updated data
  const updatedItem = await Item.findByPk(id);
  if (updatedItem) {
    // updatedItem.userId = req.session.userId;
    updatedItem.id = id;
    updatedItem.name = name;
    updatedItem.category = category;
    updatedItem.price = price;
    updatedItem.description = description;
    updatedItem.imagePath = image;
  }
  // call the save method on the created item which will know to replace the existing item with the same id
  updatedItem?.save();
  res.json(updatedItem);
};

export const deleteItem = async (req: Request, res: Response) => {
  const loggedInUser = await User.findOne({
    where: { email: res.locals.user.email },
  });
  // get all items of the logged in user and find one where the id is in the req.body
  const userItems = await loggedInUser?.getItems();

  const { itemId } = req.body;

  if (userItems) {
    for (let item of userItems) {
      if (item.id === itemId) {
        const deletedItem = await item.destroy();
        return res.status(201).json(deletedItem);
      }
    }
  }

  res.send('cannot find item with that id');
};

export const getUserItems = async (req: Request, res: Response) => {
  const loggedInUser = await User.findOne({
    where: { email: res.locals.user.email },
  });
  // find all items that have a userId matching req.session.userId
  const userItems = await Item.findAll({
    where: { userId: loggedInUser?.id },
    include: { model: User },
  });
  res.status(200).send(userItems);
};
