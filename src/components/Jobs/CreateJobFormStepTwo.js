import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import JobResultsTable from './JobResultsTable'
import { CreateJobFormError } from './CreateJobFormError'

class CreateJobFormStepTwo extends Component {

  state = {
    jobID: this.props.match.params.jobID,
    currentPositionsInvited: [],
    loading: true,
    usersAssigned: [],
    error: false
  }

  componentDidMount() {
    if(!this.props.currentJob.jobObj){
      this.setState({
        pageError: true,
        loading: false
      })
    }
    else {
      this.props.userResultsForJobCreation(this.props.currentUser.id.toString(), this.props.currentJob.jobObj)
      .then( (results) => {
        const filterResults = results.filter(user => user.id !== this.props.currentUserID) 
        this.setState({
          usersMatchedResults: filterResults,
          loading: false,
          resultsSuccessfullyLoaded: filterResults.length > 0,
          noUsersReturned: filterResults.length === 0
        })
      })
    }
  }
 
  assignPosition = (usersAssignedArr) => {
    this.setState({
      usersAssigned: usersAssignedArr,
      error: false
    })
  }

  saveAndContinue = () => {
    this.validateAssignedUsers() &&
    this.props.updateReduxJobAssignedUsers(this.state.usersAssigned) &&
    this.props.history.push(`/jobs/${this.state.jobID}/job-overview`)
  }

  validateAssignedUsers = () => {
    let validated = true
    if(this.state.usersAssigned.length === 0){
      this.setState({
        error: true
      })
      validated = false
    }
    return validated
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
          <h1>Assign Job Positions</h1>
        </div>
        <div className="app-page-section">
          {
            this.state.loading &&
            <p>Loading...</p>
          }
          {
            this.state.noUsersReturned &&
              <p><b>Oh NO!</b> No users matched your search criteria. Try going back and trying new parameters!</p>  
          }
          {
            this.state.resultsSuccessfullyLoaded &&
            <JobResultsTable
              results={this.state.usersMatchedResults}
              setUserModal={this.props.setUserModal}
              userModalActive={this.props.userModalActive}
              assignPosition={this.assignPosition}
              jobData={this.props.currentJob.jobObj}
              jobID={this.props.match.params.jobID}  
              error={this.state.error}  
            />
          }
        </div>
        <div className="job-form-navigation">
          <div className="buttons-left">
            <FormButton
              className="button-danger"
              buttonText="Cancel"
              // onClick={this.saveAndContinue}
            />
          </div>
          <div className="buttons-right">
            <FormButton
              className="button-secondary"
              buttonText="Prev Step"
              // onClick={this.saveAndContinue}
            />
            <FormButton
              className="button-primary"
              buttonText="Next Step"
              onClick={this.saveAndContinue}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepTwo