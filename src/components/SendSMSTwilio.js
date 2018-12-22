import React, { Component } from 'react'
import 'whatwg-fetch'

export class SendSMSTwilio extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    this.sendSMSInvites(this.props.users)
  }

  sendSMSInvites = async (users) => {
    const sendSMS = new Promise( (resolve, reject) => {
      try {
        users.map( user => {
          console.log('Sending invites to: ' + user[0].firstName + ' at ' + user[0].mobileNumber)
          // this.sendSMSWithTwilio(user[0].firstName, user[0].mobileNumber)
        })
        resolve('success')
      }
      catch(error) {
        console.log('Error: ' + error)
        reject('error')
      }
    })
    return await console.log(sendSMS)  
  }

  sendSMSWithTwilio = (name, number) => {
    let textBody = `Hey ${name}! You just received a job invite on The Calltime!\nClick the link below to accept or deny the job, you have 1 hour to answer before it expires.`
    fetch('http://localhost:9000/sendsms', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: textBody,
        number: number
      })
    })
    .then(resp => {
      resp.status === 200 ? console.log('Message sent!') : console.log('Message not sent!')
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          {this.state.loading && <p>One moment, sending job invites...</p>}
        </div>
      </div>
    )
  }
}
