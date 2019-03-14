import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import { CreateJobFormError } from './CreateJobFormError'

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
    if(this.state.pageError) { 
      return <CreateJobFormError 
              title="There was an error"
              errorMessage="It looks like there was a problem while creating your job. Please start over creating your job."
      /> 
    }
    const { jobObj, assignedUsers } = this.props.currentJob
    return (
      <div className="app-page">
        <div className="app-page-title">
          <h1>Job Recap and Send</h1>
        </div>
        <div className="card no-hover">
        {
          this.props.currentJob.jobObj &&
          <React.Fragment>
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
                  { this.props.currentJob.dateSelectorRangeActive 
                    ?
                      <p>{jobObj.jobDates[0]} - {jobObj.jobDates[1]}</p>
                    :
                    jobObj.jobDates.map( (date, key) => { return <p key={key}>{date}</p>})
                  }
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
                  className="button-primary"
                  buttonText="Create Job and Send Invites"
                  onClick={this.saveAndContinue}
                />
              </div> 
            </div>
          </React.Fragment>
        }
        {
          !this.props.currentJob.jobObj &&
          <React.Fragment>
            <div className="card-body">
              <p>The job data isn't provided. please start over.</p>
            </div>
            <div className="card-footer">
              <a className="button button-primary">Create a new job</a>
            </div>
          </React.Fragment>
        }
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepThree