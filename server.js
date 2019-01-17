require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { parse } = require('url')
const cors = require('cors') // Cors origin policy
const jsonParser = bodyParser.json()
const fetch = require('node-fetch')
const app = express()

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
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

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
