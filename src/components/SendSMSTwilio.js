import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'whatwg-fetch'

class SendSMSTwilio extends Component {
  state = {
    loading: true,
    jobOverviewLink: ''
  }

  componentDidMount = () => {
    this.sendSMSInvites(this.props.currentJob.assignedUsers)
  }

  sendSMSInvites = async (users) => {
    const sendSMS = new Promise( (resolve, reject) => {
      try {
        this.createJobOverviewLink(this.props.currentUser.id.toString(), this.props.currentJob.jobObj.jobID)
        const jobOverviewLink = window.location.href + '/' + this.props.currentUser.id.toString() + '/' + this.props.currentJob.jobObj.jobID
        users.map( user => {
          this.sendSMSWithTwilio(user.name, user.number)
          this.sendJobNotificationLink(user.id, this.props.currentUser.jobObj.jobID, jobOverviewLink)
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

  sendJobNotificationLink = (userID, jobID, jobOverviewLink) => {
    const jobNotificationData = {
      text: "You were invited to a job!",
      link: jobOverviewLink
    }
    this.props.createJobNotification(userID, jobID, jobNotificationData)
  }

  sendSMSWithTwilio = (name, number) => {
    let textBody = `Hey ${name}! You just received a job invite on The Calltime!`
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
      resp.status === 200 
      ? 
        console.log('Success, Twilio text sent')
      : console.log('Message not sent!')
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

export default SendSMSTwilio
