import React, { Component } from 'react'
import { FormButton } from '../FormButton'

class CreateJobFormStepThree extends Component {
  state = {
    jobID: this.props.match.params.jobID
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.createJob(this.props.currentUser.id.toString(), this.props.currentJob.jobObj.jobID.toString(), this.props.currentJob.jobObj, this.props.currentJob.assignedUsers)
      .then( result => {
        result === 'success' 
        ? this.props.history.push(`/jobs/${this.state.jobID}/send-job-invites`)
        : this.props.errorStep()
      })
  }

  render() {
    const { jobObj, assignedUsers } = this.props.currentJob
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
              <p>{jobObj.jobCreator}</p>
              <label>Job Name: </label>
              <p>{jobObj.jobName}</p>
              <label>Job Description: </label>
              <p>{jobObj.jobDesc}</p>
              <label>Job Dates: </label>
              <p>{jobObj.jobDates.map( date => {
                return date
              })}</p>
              <label>Job Location: </label>
              <p>{jobObj.jobLocation.value}</p>
              <label>Preferred Contact: </label>
              <p>{jobObj.jobContact}</p>
              <label>Job Invitations: </label>
              <ul>
                {assignedUsers.map( (user, key) => {
                  return <li key={key}>{user.name}: {user.position}</li>
                })}
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <FormButton
              className="button-form"
              buttonText="Create Job and Send Invites"
              onClick={this.saveAndContinue}
            />
          </div> 
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepThree