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
      <React.Fragment>
        <PageHeader pageTitle="Hire A Crew" />
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Create A Job</h2>
              <p className="card-subtitle">Click the button to create a job.</p>
            </div>
            <div className="card-item">
              <button
                className="button-primary"  
                onClick={() => { this.props.setModal(true, "Create A Job Request", 
                  <CreateJobForm 
                    currentUser={this.props.currentUser} 
                    createJob={this.props.createJob}
                    userResultsForJobCreation={this.props.userResultsForJobCreation}
                  />)} 
                }
              >Create a Job</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Jobs