export const sendSMSAlerts = (recipientNumber, message) => async () => {
  let response = await fetch('https://us-central1-the-calltime.cloudfunctions.net/sendSMS', {
    method: 'POST',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: message,
      number: recipientNumber
    })
  })
  return response.status
}