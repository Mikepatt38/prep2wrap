const accountSid = 'AC0936b65c8fa91d19c4f8ab2f6d0d9da8'
const authToken = '47ea0f5b93c0e4a2ef2c8c28269c6a33'
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
     body: 'This is a test message from Twilio!',
     from: '+16822049551',
     to: '+18179654467'
   })
  .then(message => console.log(message.sid))
  .done();

export default client 