import { Router } from 'express';
import Stripe from 'stripe';
import { createOrder, createStripCheckoutSession, getUserOrders, } from '../../controllers/orderController.js';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe;
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
