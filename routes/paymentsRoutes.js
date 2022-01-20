const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'GBP',
      description: 'pay £5 get 5 credits',
      // req.body comes from body-parser
      source: req.body.id,
    });

    // user gets assigned from passport JS
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
