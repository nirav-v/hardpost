// const router = require("express").Router();
// const { User, Item } = require("../../models");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Auth = require("../../util/serverAuth");
// const jwt = require("jsonwebtoken");
import { Router } from "express";
import { User, Item } from "../../models/index.js";
import Auth from "../../util/serverAuth.js";
import {
  createOrder,
  createStripCheckoutSession,
  getUserOrders,
} from "../../controllers/orderController.js";
const router = Router();

router.post("/create-checkout-session", createStripCheckoutSession);

router.get("/orders", getUserOrders);

router.post("/create-order", createOrder);

// module.exports = router;
export default router;
