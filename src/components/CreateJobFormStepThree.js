import React, { Component } from 'react'
import 'whatwg-fetch'
import { FormButton } from './FormButton'

export class CreateJobFormStepThree extends Component {

  sendSMSWithTwilio = () => {
    const { state } = this.props
    // let textBody = `
    //   Job Name: ${state.jobObj.jobName} \n \n Job Creator: ${state.jobObj.jobCreator} \n\n Job Dates: ${state.jobObj.jobDates.map( date => {
    //     return ' ' + date 
    //   })} \n\n Job Location: ${state.jobObj.jobLocation} \n \n Preferred Contact: ${state.jobObj.jobContact}
    // `

    let textBody = "Hey! You just recieved a job invite on The Calltime! Click the link below to accept or deny the job, you have 1 hour to answer before it expires."
    fetch('http://localhost:9000/sendsms', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: textBody
      })
    })
    .then(resp => {
      resp.status === 200 ? this.props.nextStep() : this.props.errorStep()
    })
  }
  
  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.createJob(this.props.currentUser.id.toString(), this.props.state.jobObj)
      .then( result => {
        result === 'success' ? this.sendSMSWithTwilio() : this.props.errorStep()
      })
  }

  saveAndGoBack = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const { state } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <h3>Assign Positions to Potential Users</h3>
          <p>Fill out the job details to find the best users for the job.</p>  
        </div>
        <div className="card-body">
          <div className="card-item">
            <div className="card-item-info">
              <label>Job Creator: </label>
              <p>{state.jobObj.jobCreator}</p>
              <label>Job Name: </label>
              <p>{state.jobObj.jobName}</p>
              <label>Job Description: </label>
              <p>{state.jobObj.jobDesc}</p>
              <label>Job Dates: </label>
              <p>{state.jobObj.jobDates.map( date => {
                return date
              })}</p>
              <label>Job Location: </label>
              <p>{state.jobObj.jobLocation}</p>
              <label>Preferred Contact: </label>
              <p>{state.jobObj.jobContact}</p>
              <label>Job Invitations: </label>
              <ul>
                {state.usersAssigned.map( (user, key) => {
                  return <li key={key}>{user[0].firstName}: {user[1]}</li>
                })}
              </ul>
            </div>
          </div>
          <form className="card-form-general">
            <FormButton
              className="button-form"
              buttonText="Prev Step"
              onClick={this.saveAndGoBack}
            />
            <FormButton
              className="button-form"
              buttonText="Create Job"
              onClick={this.saveAndContinue}
            />
          </form> 
        </div>
      </div>
    )
  }
}