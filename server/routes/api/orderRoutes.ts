import { Router } from "express";
import bodyParser from "body-parser";

import {
  createOrder,
  createStripCheckoutSession,
  getUserOrders,
} from "../../controllers/orderController.js";

const router = Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body;

    console.log("Got payload: " + payload);

    response.status(200).end();
  }
);

router.post("/create-checkout-session", createStripCheckoutSession);

router.get("/orders", getUserOrders);

router.post("/create-order", createOrder);

// module.exports = router;
export default router;
