const stripe = require('../config/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        console.log("Error stripeErr:",stripeErr)
      res.status(500).send({ error: stripeErr });
    } else {
        console.log("res stripeRes:",stripeRes)
      res.status(200).send({ success: stripeRes });
    }
  }
  
  const paymentApi = app => {
    app.get('/', (req, res) => {
      res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
    });
  
    app.post('/', (req, res) => {
      stripe.charges.create(req.body, postStripeCharge(res));
    });
  
    return app;
  };
  
  module.exports = paymentApi;