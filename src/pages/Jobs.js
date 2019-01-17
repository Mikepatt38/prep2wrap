import React, { Component } from 'react'
import { PageHeader } from '../components/PageHeader'
import { CreateJobForm } from '../components/CreateJobForm'

class Jobs extends Component {

  handleClick = (e) => {
    e.preventDefault()
    console.log('clicked')
    this.props.setModal(true, "Create A Job Request", 
      <CreateJobForm 
        currentUser={this.props.currentUser} 
        createJob={this.props.createJob}
      />)
  }

  render() {
    return (
      <div className="container containerMargin">
        <CreateJobForm 
          currentUser={this.props.currentUser} 
          createJob={this.props.createJob}
          userResultsForJobCreation={this.props.userResultsForJobCreation}
          userModalActive={this.props.userModalActive}
          setUserModal={this.props.setUserModal}
          createJobNotification={this.props.createJobNotification}
        />
      </div>
    )
  }
}

export default Jobs