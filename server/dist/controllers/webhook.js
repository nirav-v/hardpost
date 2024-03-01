var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Stripe from 'stripe';
import { fulfillOrder } from '../util/fulfillOrder.js';
export const webhookMiddleware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        res.status(400).json({
            error: 'cannot find stripe secret key env var is undefined, check your env variables config',
        });
        return;
    }
    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-08-16',
    });
    let payload = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
        res.status(400).json({
            error: 'cannot find webhook secret env var, check your env variables config',
        });
        return;
    }
    const sig = req.headers['stripe-signature'];
    if (!sig) {
        res.status(400).json({
            error: 'could not find stripe-signature in request header to construct the payment event',
        });
        return;
    }
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }
    // // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the res, you may include them by expanding line_items.
        const session = yield stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ['line_items'],
        });
        const userEmail = session.customer_email;
        // Fulfill the purchase...
        if (userEmail)
            yield fulfillOrder(userEmail);
    }
    res.status(201).send('IN THE STRIPE WEBHOOK');
});
