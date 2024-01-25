import Stripe from 'stripe';
import { fulfillOrder } from '../util/fulfillOrder.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhookMiddleware = async (request, response, next) => {
  let payload = request.body;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return response.status(400).send(`Webhook Error: ${err}`);
  }

  // // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );

    const userEmail = session.customer_email;

    // Fulfill the purchase...
    await fulfillOrder(userEmail); // not working..
  }

  response.status(201).send('IN THE STRIPE WEBHOOK');
};
