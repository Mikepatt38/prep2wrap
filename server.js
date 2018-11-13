const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// import keys from './twiliokeys';

const app = express()

app.use('/', express.static('public'))

app.post('/sendsms', bodyParser.json(), (req, res) => {
  var client = require('twilio')(AC0936b65c8fa91d19c4f8ab2f6d0d9da8, '47ea0f5b93c0e4a2ef2c8c28269c6a33')
  client.sendMessage({
    to: req.body.data,
    from: '+16822049551',
    body: 'This is a test twilio text.'
  }, function (err, responseData) {
    if (!err) {
      res.json({"From": responseData.from, "Body": responseData.body});
    }
  })
})

app.listen(process.env.PORT || 3000)