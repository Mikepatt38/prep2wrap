import React, { Component } from 'react'
import { FormButton } from './FormButton'
import JobResultsTable from './JobResultsTable'

class CreateJobFormStepTwo extends Component {

  state = {
    jobID: this.props.match.params.jobID,
    currentPositionsInvited: [],
    usersMatchedResults: [],
    loading: true,
    usersAssigned: [[]]
  }

  componentDidMount() {
    console.log(this.props.currentJob.jobObj)
    this.props.userResultsForJobCreation(this.props.currentUser.id.toString(), this.props.currentJob.jobObj)
      .then( (results) => {
        console.log(results)
        const filterResults = results.filter(user => user.id !== this.props.currentUserID) 
        this.setState({
          usersMatchedResults: filterResults,
          loading: false
        })
      })
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
    if(this.state.loading) return <h1>Loading...</h1>
    if(this.state.usersMatchedResults.length === 0){
      return (
        <NoResultsTable />
      )
    }
    return (
      !this.state.loading && this.state.usersMatchedResults.length > 0 &&  
      <div className="card">
        <div className="card-header">
          <h3>Assign Positions to Potential Users</h3>
          <p>Fill out the job details to find the best users for the job.</p>
        </div>
        <div className="card-body">
          <JobResultsTable
            results={this.state.usersMatchedResults}
            setUserModal={this.props.setUserModal}
            userModalActive={this.props.userModalActive}
            positions={this.props.currentJob.jobObj.jobPositions}
            assignPosition={this.assignPosition}
          />
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

const NoResultsTable = () => (
  <div className="card">
    <div className="card-header">
      <h3>Assign Positions to Potential Users</h3>
      <p>Fill out the job details to find the best users for the job.</p>
    </div>
    <div className="card-body">
      <p><b>Oh NO!</b> No users matched your search criteria. Try going back and trying new parameters!</p>  
    </div>
  </div>  
)

export default CreateJobFormStepTwo