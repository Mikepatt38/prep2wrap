require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { parse } = require('url')
const cors = require('cors') // Cors origin policy
const jsonParser = bodyParser.json()
const fetch = require('node-fetch')
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECURITY_KEY)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const PORT = process.env.SERVER_PORT || 9000

const whitelist = [
  'http://0.0.0.0:3000',
  'http://localhost:3000',
  'http://0.0.0.0:9000',
  'http://localhost:9000',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Accept', 'Content-Type', 'Access-Control-Allow-Origin'],
}

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// app.use(bodyParser.json()) 
app.post("/create-user-subscription", bodyParser.json({ type: "application/json" }), async (req, res) => {
  try {
    // We want to create the customer with stripe
    const customer = await stripe.customers.create({
      name: req.body.userName,
      email: req.body.userEmail,
      source: req.body.stripeSourceId
    })

    // We want to create the subscription from the customer to the product
    // *********** This is the test subscription plan -- replace with live when goes live ************
    // We need to create a trial period of 14 days and then see if we want a 
    // prorate period so everyone pays on the 1st or no
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'YOUR_PLAN_ID_HERE' }],
      // This allows the trial in the plan to take affect
      // trial_from_plan: true
    })
    res.json({
      status: subscription.status,
      stripe_id: customer.id
    })
  }
  catch (err) {
    console.log('Error: ' + err.message)
    res.status(500).end()
  }
});

app.post("/update-user-source", bodyParser.json({ type: "application/json" }), async (req, res) => {
  try {
    // We need to get the users current default source id
    const currentSourceID = await stripe.customers.retrieve(req.body.customer_id)
    // Updating the customers default source to the one provided
    stripe.customers.createSource(req.body.customer_id, {
      source: req.body.stripeSourceId
    })
      .then(() => {
        // Lets detach the old source from the customer -- this detaches their old default payment method
        stripe.customers.deleteSource(
          req.body.customer_id,
          currentSourceID.sources.data[0].id,
          function (err, confirmation) {
            if (err) console.log(err)
            if (confirmation) res.send(true)
          }
        );
      })
      .catch((error) => {
        console.log('Error: ' + err.message)
        res.status(500).end()
      })
  }
  catch (err) {
    console.log('Error: ' + err.message)
    res.status(500).end()
  }
});

app.post('/sendsms', bodyParser.json(), (req, res) => {
  let SID = process.env.TWILIO_SID
  let TOKEN = process.env.TWILIO_TOKEN

  var client = require('twilio')(SID, TOKEN)
  client.messages
    .create({
      to: '+1' + req.body.number,
      from: YOUR_TWILIO_SENDER_NUMBER,
      body: req.body.message
    })
    .then(() => res.send())
    .catch(error => console.error(error.toString()))
})

app.listen(PORT, _ =>
  console.info(
    `Server listening on PORT ${PORT}... Mode ${process.env.NODE_ENV}`
  )
)
