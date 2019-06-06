require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { parse } = require('url')
const cors = require('cors') // Cors origin policy
const jsonParser = bodyParser.json()
const fetch = require('node-fetch')
const app = express()
const stripe = require("stripe")("sk_test_dFdzogiSreiyt7uncg3dg1eE0065opT4ZA")

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

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(bodyParser.json()) 
app.post("/create-user-subscription", async (req, res) => {
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
