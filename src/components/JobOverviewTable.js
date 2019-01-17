import React, { Component } from 'react'
import { isEmpty } from '@firebase/util';

class JobOverviewTable extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    const path = window.location.pathname
    const result = path.split("/")
    const creatorID = result[2]
    const jobID = result[3]
    this.props.getJobOverviewData(creatorID, jobID)
      .then((result) => {
        this.setState({
          jobOverviewData: result,
          loading: false
        })
      })
  }

  testIfCurrentUserIsAssigned = (currentUserId) => {
    let isUserAssigned = false
    this.state.jobOverviewData.usersAssigned.map( user => {
      if(user.id === currentUserId) {
        isUserAssigned = true
      }
    })
    return isUserAssigned
  }
  
  testIfCurrentUserAccepted = (currentUserId) => {
    let userAccepted = false
    this.state.jobOverviewData.usersAssigned.map( user => {
      if(user.id === currentUserId) {
        userAccepted =  user.status === "pending" ? false : true
      }
    })
    return userAccepted
  }

  testIfCurrentUserIsCreator = (currentUserID) => {
    if(this.state.jobOverviewData.jobCreatorID === currentUserID) {
      return true
    }
    return false
  }

  acceptJobInvite = (e) => {
    e.preventDefault()
    const jobOverviewLink = this.state.jobOverviewData.jobCreatorID + '/' + this.state.jobOverviewData.jobID
    const index = this.state.jobOverviewData.usersAssigned.map( (user, key) => {
      if( user.id === this.props.currentUser.id) {
        return key
      }
    })
    let newUsersAssignedObject = Object.assign({}, this.state.jobOverviewData)
    newUsersAssignedObject.usersAssigned[index.toString()].status = "accepted"
    this.setState({
      jobOverviewData: newUsersAssignedObject
    })
    this.props.acceptJobInvitation(this.state.jobOverviewData.jobCreatorID, this.state.jobOverviewData.jobID, this.props.currentUser, this.state.jobOverviewData.usersAssigned, jobOverviewLink)
      .then( (result) => {
        console.log(result)
      })
  }

  denyJobInvite = (e) => {
    e.preventDefault()
    const index = this.state.jobOverviewData.usersAssigned.map( (user, key) => {
      if( user.id === this.props.currentUser.id) {
        return key
      }
    })

    const newUsers = this.state.jobOverviewData.usersAssigned.filter( user => user.id.toString() !== this.props.currentUser.id.toString())
    this.setState(prevState => ({
      jobOverviewData: {
        ...prevState.jobOverviewData,
        usersAssigned: newUsers
      }
    }), () => {
      this.props.denyJobInvitation(this.state.jobOverviewData, this.props.currentUser)
      .then( (result) => {
        result === "success" ? this.props.history.push("/dashboard") : console.log("Error")
      })
    })
  }

  render() {
    if(this.state.loading) return <h1>Loading</h1>
    const { jobOverviewData } = this.state
    const isCurrentUserAssigned = this.testIfCurrentUserIsAssigned(this.props.currentUser.id)
    const hasUserAccepted = this.testIfCurrentUserAccepted(this.props.currentUser.id)
    const isCurrentUserJobCreator = this.testIfCurrentUserIsCreator(this.props.currentUser.id)
    return (
      <div className="card">
        <div className="card-header">
        <h3>Job Overview: {jobOverviewData.jobName}</h3>
        <p>This is the job overview page for the selected job. Anyone can view this job, the job creator can edit or delete.</p>  
        </div>
        <div className="card-body">
        <div className="job-item">
          <h4>Job Creator:</h4>
          <p>{jobOverviewData.jobCreator}</p>
        </div>
        <div className="job-item">
          <h4>Job Location:</h4>
          <p>{jobOverviewData.jobLocation.value}</p>
        </div>
        <div className="job-item">
          <h4>Job Dates:</h4>
          {jobOverviewData.jobDates.map( (date, key) => { return <p key={key}>{date}</p>})}
        </div>
        <div className="job-item">
          <h4>Job Description:</h4>
          <p>{jobOverviewData.jobDesc}</p>
        </div>
        <div className="job-item">
          <h4>Union Required:</h4>
          <p>{jobOverviewData.unionMember ? 'Yes' : 'No'}</p>
        </div>
        <div className="job-item">
          <h4>Positions:</h4>
          {jobOverviewData.jobPositions.map( (position, key) => { return <p key={key}>{position}</p>})}
        </div>
        <div className="job-item">
          <h4>Preferred Contact:</h4>
          <p>{jobOverviewData.jobContact}</p>
        </div>
        </div>
        <div className="card-footer">
        {
          isCurrentUserAssigned && !hasUserAccepted &&
          <div className="card-footer-action">
            <button className="button-form" onClick={(e) => this.acceptJobInvite(e)}>Accept</button>
            &nbsp;
            <button className="button-form" onClick={(e) => this.denyJobInvite(e)}>Deny</button>
          </div>
        }
        {
          isCurrentUserJobCreator && 
          <p>User is creator.</p>
        }
        </div>
      </div>
    )
  }
}

export default JobOverviewTable
