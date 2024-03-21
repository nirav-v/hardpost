// const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ msg: 'no token provided in authorization headers' });
    }

    // token sent in format: `Bearer <token>`
    const token = req.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      res.json({ err: 'could not verify the token provided' });
    }

    res.locals.user = payload;

    next();
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
