import { Router } from 'express';
import Stripe from 'stripe';
import { createOrder, createStripCheckoutSession, getUserOrders, } from '../../controllers/orderController.js';
import { checkToken } from '../../util/serverAuth.js';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe;
if (stripeSecretKey) {
    stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-08-16',
    });
}
const router = Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
router.post('/create-checkout-session', checkToken, createStripCheckoutSession);
router.get('/orders', checkToken, getUserOrders);
router.post('/create-order', checkToken, createOrder);
// module.exports = router;
export default router;
