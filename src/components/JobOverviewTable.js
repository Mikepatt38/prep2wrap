import React, { Component } from 'react'

class JobOverviewTable extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    const path = window.location.pathname
    const result = path.split("/")
    const creatorID = result[2]
    const jobID = result[3]
    console.log(creatorID)
    console.log(jobID)
    this.props.getJobOverviewData(creatorID, jobID)
      .then((result) => {
        console.log(result)
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

  testIfCurrentUserIsCreator = (currentUserID) => {
    if(this.state.jobOverviewData.jobCreatorID === currentUserID) {
      return true
    }
    return false
  }

  render() {
    if(this.state.loading) return <h1>Loading</h1>
    const { jobOverviewData } = this.state
    const isCurrentUserAssigned = this.testIfCurrentUserIsAssigned(this.props.currentUser.id)
    const isCurrentUserJobCreator = this.testIfCurrentUserIsCreator(this.props.currentUser.id)
    console.log(isCurrentUserAssigned)
    console.log(isCurrentUserJobCreator)
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
          isCurrentUserAssigned &&
          <p>User is assigned.</p>
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
