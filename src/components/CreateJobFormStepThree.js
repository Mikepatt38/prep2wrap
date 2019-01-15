import React, { Component } from 'react'
import { FormButton } from './FormButton'

export class CreateJobFormStepThree extends Component {

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.createJob(this.props.currentUser.id.toString(), this.props.state.jobObj.jobID.toString(), this.props.state.jobObj)
      .then( result => {
        result === 'success' 
        ? this.props.nextStep()
        : this.props.errorStep()
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
              <p>{state.jobObj.jobLocation.value}</p>
              <label>Preferred Contact: </label>
              <p>{state.jobObj.jobContact}</p>
              <label>Job Invitations: </label>
              <ul>
                {state.usersAssigned.map( (user, key) => {
                  return <li key={key}>{user.name}: {user.position}</li>
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