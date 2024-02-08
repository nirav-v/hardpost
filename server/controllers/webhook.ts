import Stripe from 'stripe';
import { fulfillOrder } from '../util/fulfillOrder.js';

export const webhookMiddleware = async (request, response, next) => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    response.status(400).json({
      error:
        'cannot find stripe secret key env var is undefined, check your env variables config',
    });
    return;
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-08-16',
  });

  let payload = request.body;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    response.status(400).json({
      error:
        'cannot find webhook secret env var, check your env variables config',
    });
    return;
  }

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
