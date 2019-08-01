import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormButton } from '../Forms/FormButton'
import JobResultsTable from './JobResultsTable'
import EmptyState from '../General/EmptyState'
import NoResultsIllustration from '../../img/illustrations/no-results.svg'
import Loading from "../General/Loading"

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
        loading: false
      })
      throw new Error('No job data')
    }
    else {
      this.props.userResultsForJobCreation(this.props.currentUser.id.toString(), this.props.currentJob.jobObj)
      .then( (results) => {
        this.setState({
          usersMatchedResults: results,
          loading: false,
          resultsSuccessfullyLoaded: results.length > 0,
          noUsersReturned: results.length === 0
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

  sendSMSAlert = (users) => {
    let promises = []

    users.map( user => {
      let userSMSMsg = `${user.name}, you have been invited to a crew as a ${user.position}.`
      promises.push(this.props.createPendingJob(user.id, this.props.currentJob.jobObj.jobCreator, this.props.currentJob.jobObj.jobID, this.props.currentJob.assignedUsers))
      promises.push(this.props.sendSMSAlerts(user.number, userSMSMsg))
      promises.push(this.sendJobNotificationLink(user.id, user.name, user.position, this.props.currentJob.jobObj.jobID))
    })

    Promise.all(promises).then( () => this.props.history.push("/jobs"))
    .catch( (error) => console.log(error.message))
  }

  sendJobNotificationLink = (userID, userName, userPosition, jobID) => {
    const jobNotificationData = {
      text: `${userName}, you're invited to join a crew as a ${userPosition}`,
      type: 'invite'
    }
    this.props.createUserJobNotification(userID, jobID, jobNotificationData)
  }

  updateAssignedUsers(users){
    let promises = []
    promises.push(this.props.updateReduxJobAssignedUsers(users))
    return Promise.all(promises).then(() => this.props.currentJob.assignedUsers)
  }

  saveAndContinue = async () => {
    let sendSMSSuccess
  
    if(this.validateAssignedUsers()){
      let newAssignedUsers = await this.updateAssignedUsers(this.state.usersAssigned)
      let jobCreated = await this.props.createJob(this.props.currentUser.id.toString(), this.props.currentJob.jobObj.jobID.toString(), this.props.currentJob.jobObj, newAssignedUsers)
      if(jobCreated) sendSMSSuccess = await this.sendSMSAlert(this.state.usersAssigned)
    }
  }

  saveAndGoBack(e){
    e.preventDefault()
    this.props.history.push(`/jobs/${this.state.jobID}/job-information`)
  }

  cancelJobCreation(e){
    e.preventDefault()
    this.props.createReduxJob({})
    this.props.history.push('/jobs')
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
    return (  
      <div className="app-page">
        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="link">Dashboard</Link>
              <Link to="/availability" className="link">Availability</Link>
              <Link to="/jobs" className="active">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
            <Link className="button button-workspace" to={{
              pathname: `/jobs/${this.state.jobID}/job-information`,
              query: `${this.state.jobID}`
            }}>Create New Job</Link>
          </div> 
        </div>

        <div className="app-page-body">
          {
            this.state.loading &&
            <div className="app-page-section">
              <Loading />
            </div>
          }
          {
            this.state.noUsersReturned &&
            <div className="app-page-section">
              <EmptyState
                imgSrc={NoResultsIllustration}
                imgAlt="No Results For User Job Search Illustration"
                title="We didn't find any crew members"
                text="We didn't find any crew members that matched your criteria, try going back and adding/ updating criteria to your job for a better chance of finding crew members for your job."
              />
            </div>
          }
          {
            this.state.resultsSuccessfullyLoaded &&
            <div className="app-page-section">
              <div className="card">
                <div className="card-body">
                  <JobResultsTable
                    currentUser={this.props.currentUser}
                    results={this.state.usersMatchedResults}
                    setUserModal={this.props.setUserModal}
                    userModalActive={this.props.userModalActive}
                    assignPosition={this.assignPosition}
                    jobData={this.props.currentJob.jobObj}
                    jobID={this.props.match.params.jobID}  
                    error={this.state.error}  
                  />
                  <div className="button-wrapper">
                    <FormButton
                      className="button-quit"
                      buttonText="Cancel"
                      onClick={(e) => this.cancelJobCreation(e)}
                    />
                    <FormButton
                      className="button-primary"
                      buttonText="Send Job Invites"
                      onClick={this.saveAndContinue}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default CreateJobFormStepTwo