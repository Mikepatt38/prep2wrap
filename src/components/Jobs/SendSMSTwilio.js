import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'whatwg-fetch'
import { CreateJobFormError } from './CreateJobFormError'

class SendSMSTwilio extends Component {
  state = {
    loading: true,
    jobOverviewLink: ''
  }

  componentDidMount = () => {
    if(!this.props.currentJob.assignedUsers){
      this.setState({
        pageError: true,
        loading: false
      })
    }
    this.sendSMSInvites(this.props.currentJob.assignedUsers)
  }

  sendSMSInvites(users){
    this.createJobOverviewLink(this.props.currentUser.id.toString(), this.props.currentJob.jobObj.jobID)
    const jobOverviewLink = '/job-overview/' + this.props.currentUser.id.toString() + '/' + this.props.currentJob.jobObj.jobID
    try{
      users.map( user => {
        this.props.createPendingJob(user.id, this.props.currentJob.jobObj.jobID, this.props.currentJob.assignedUsers)
        this.sendSMSWithTwilio(user.name, user.number)
        this.sendJobNotificationLink(user.id, user.name, user.position, this.props.currentJob.jobObj.jobID, jobOverviewLink)
      })
    }
    catch(error) {
      this.props.errorStep()
    }
  }

  createJobOverviewLink = (userID, jobID) => {
    const jobOverviewLink = '/job-overview/' + userID + '/' + jobID
    this.setState({
      loading: false,
      jobOverviewLink: jobOverviewLink
    })
  }

  sendJobNotificationLink = (userID, userName, userPosition, jobID, jobOverviewLink) => {
    const jobNotificationData = {
      text: `${userName}, you're invited to join a crew as a ${userPosition}`,
      type: 'invite'
    }
    this.props.createUserJobNotification(userID, jobID, jobNotificationData)
  }

  sendSMSWithTwilio = (name, number) => {
    let textBody = `Hey ${name}, you were invited to join a crew on CREW IT UP. Visit the jobs page on your account to see more.`
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
    if(this.state.pageError) { 
      return <CreateJobFormError 
              title="There was an error"
              errorMessage="It looks like there was a problem while creating your job. Please start over creating your job."
      /> 
    }
    return (
      <div className="app-page">
        <div className="app-page-title">
          <h1>Your Job Was Created</h1>
        </div>
        <div className="card no-hover">
          <div className="card-body">
            {this.state.loading && <p>One moment, sending job invites...</p>}
            {!this.state.loading && !this.state.pageError &&
              <Link to={this.state.jobOverviewLink}>View job overview</Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default SendSMSTwilio
