import Stripe from 'stripe';
import { Buffer } from 'node:buffer';

import { fulfillOrder } from '../util/fulfillOrder.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhookMiddleware = async (request, response, next) => {
  let payload = request.body;
  console.log('PAYLOAD: ', payload);
  const endpointSecret =
    'whsec_0573ae4fbdb02575794b86ec649f5089ab4436742fe8178ee0d348e5582f13da';
  const sig = request.headers['stripe-signature'];
  console.log('secret ', endpointSecret);
  console.log('sig: ', sig);

  let event;

  try {
    console.log('in try');
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log('after making event: ', event);
  } catch (err) {
    console.log(err);
    return response.status(400).send(`Webhook Error: ${err}`);
  }
  console.log('EVENT object :::', event);

  // // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    console.log('stripe session: ', session);
    const lineItems = session.line_items;
    const userEmail = session.customer_email;

    // Fulfill the purchase...
    await fulfillOrder(userEmail); // not working..
  }

  response.status(201).send('IN THE STRIPE WEBHOOK');
};
