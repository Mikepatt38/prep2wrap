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

// app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// app.use(bodyParser.json()) 
app.post("/create-user-subscription", bodyParser.json({type: "application/json" }), async (req, res) => {
  try{
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
      items: [{ plan: 'plan_F4KYpb4Vh36vyA' }],
    })
    res.json({
      status: subscription.status,
      stripe_id: customer.id
    })
  }
  catch(err){
    console.log('Error: ' + err.message)
    res.status(500).end()    
  }
});

// Stripe Web-hook Endpoint to listen for Stripe updates -- send an email to owner and user
app.post('/stripe-webhook', bodyParser.raw({type: 'application/json'}), (request, res) => {
  // Stripe endpoint secret
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

  const sig = request.headers['stripe-signature'];
  let event;

  // Check to make sure the request came from Stripe and not another source
  // If succeeds, put the event into the event variable
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  }
  // If it fails, simply return an error
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(event.type)
  // Handle the event based on the type. 
  // Use a switch statement to minimize the endpoints needed from stripe to one
  // Handle the request based on the event 
  switch (event.type) {
    case 'customer.subscription.deleted':
      console.log('The user just deleted themselves')
      break;
    case 'customer.created':
      console.log('The user was created: Lets update people')
      if (!req.body) return res.sendStatus(400)
      const msg = {
        to: 'michael@outlyrs.com',
        from: 'mjpatt381@gmail.com',
        subject: 'User was just created',
        text: 'Hey, we created a new user.',
      }
      sgMail
        .send(msg)
        .then(() => res.sendStatus(200))
        .then(() => console.log('Mail sent successfully'))
        .catch(error => console.error(error.toString()))
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // // Retrieve the request's body and parse it as JSON
  // const eventJson = JSON.parse(request.body);

  // /* Do something with eventJson */

  // Return a response to acknowledge receipt of the event
  res.sendStatus(200);
});

app.post('/sendsms', bodyParser.json(), (req, res) => {
  let SID = process.env.TWILIO_SID
  let TOKEN = process.env.TWILIO_TOKEN
  let SENDER = process.env.TWILIO_SENDER

  var client = require('twilio')(SID, TOKEN)
  client.messages
  .create({
    to:   '+1'+req.body.number,
    from: '+16822049551',
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
