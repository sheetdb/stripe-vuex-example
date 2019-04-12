const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
var bodyParser = require('body-parser')

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use( bodyParser.json() )

  app.post('/charge', function (req, res) {
    let token = req.body.stripeToken;
    let email = req.body.stripeEmail;
    const stripe = require('stripe')('PASTE_HERE_YOUR_PRIVATE_KEY');

    // const customer = await stripe.customers.create({
    //   email: req.body.stripeToken
    // });

    stripe.customers.create({
      email: email
    }).then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: 'tok_visa'
      });
    }).then((source) => {
      return stripe.charges.create({
        amount: 1600, // amount in cents; 1600 = 16,00 USD
        currency: 'usd',
        customer: source.customer
      });
    }).then((charge) => {
      // here enter logic after card was successfully charged
      res.redirect('/success')
    }).catch((err) => {
      // here enter logic after card was unsuccessfully charged
      res.redirect('/error')
    });
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
