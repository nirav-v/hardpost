import { Router } from 'express';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import {
  createOrder,
  createStripCheckoutSession,
  getUserOrders,
} from '../../controllers/orderController.js';
import Item from '../../models/Item.js';
import User from '../../models/User.js';
import { fulfillOrder } from '../../util/fulfillOrder.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe: Stripe;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-08-16',
  });
}

const router = Router();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/create-checkout-session', createStripCheckoutSession);

router.get('/orders', getUserOrders);

router.post('/create-order', createOrder);

// module.exports = router;
export default router;
