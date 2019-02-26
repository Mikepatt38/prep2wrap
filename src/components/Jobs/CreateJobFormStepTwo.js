import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import JobResultsTable from './JobResultsTable'

class CreateJobFormStepTwo extends Component {

  state = {
    jobID: this.props.match.params.jobID,
    currentPositionsInvited: [],
    loading: true,
    usersAssigned: [[]]
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
      usersAssigned: usersAssignedArr
    })
  }

  saveAndContinue = () => {
    this.props.updateReduxJobAssignedUsers(this.state.usersAssigned)
    this.props.history.push(`/jobs/${this.state.jobID}/job-overview`)
  }
 
  render() {
    return (  
      <div className="card">
        <div className="card-header">
          <h3>Assign Positions to Potential Users</h3>
          <p>Fill out the job details to find the best users for the job.</p>
        </div>
        <div className="card-body">
          {
            this.state.loading &&
            <p>Loading...</p>
          }
          {
            this.state.pageError &&
            <p>Error...</p>
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
              positions={this.props.currentJob.jobObj.jobPositions}
              assignPosition={this.assignPosition}
              jobID={this.props.match.params.jobID}
              jobName={this.props.currentJob.jobObj.jobName}
              jobCreatorID={this.props.currentJob.jobObj.jobCreatorID}
            />
          }
        </div>
        <div className="card-footer">
          <FormButton
            className="button-form"
            buttonText="Next Step"
            onClick={this.saveAndContinue}
          />
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepTwo