import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'whatwg-fetch'

export class SendSMSTwilio extends Component {
  state = {
    loading: true,
    jobOverviewLink: ''
  }

  componentDidMount = () => {
    this.sendSMSInvites(this.props.users)
  }

  sendSMSInvites = async (users) => {
    const sendSMS = new Promise( (resolve, reject) => {
      try {
        this.createJobOverviewLink(this.props.currentUser.id.toString(), this.props.jobID)
        const jobOverviewLink = window.location.href + '/' + this.props.currentUser.id.toString() + '/' + this.props.jobID
        users.map( user => {
          this.sendSMSWithTwilio(user.name, user.number, jobOverviewLink)
        })
        resolve('success')
      }
      catch(error) {
        console.log('Error: ' + error)
        reject('error')
      }
    })
    const isTwilioInviteSuccess = await sendSMS
    isTwilioInviteSuccess === 'success' 
      ?
      // this.props.nextStep()
      console.log(isTwilioInviteSuccess)
      :
      this.props.errorStep()

  }

  createJobOverviewLink = (userID, jobID) => {
    const jobOverviewLink = '/jobs/' + userID + '/' + jobID
    this.setState({
      loading: false,
      jobOverviewLink: jobOverviewLink
    })
  }

  sendSMSWithTwilio = (name, number, jobOverviewLink) => {
    let textBody = `Hey ${name}! You just received a job invite on The Calltime!\n\nClick the link below to accept or deny the job, you have 1 hour to answer before it expires.\n\n ${jobOverviewLink}`
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
          {!this.state.loading && 
            <Link to={this.state.jobOverviewLink}>View job overview</Link>
          }
        </div>
      </div>
    )
  }
}
