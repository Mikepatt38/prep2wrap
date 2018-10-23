import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import { PageHeader } from '../components/PageHeader'

class Jobs extends Component {
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
                onClick={() => {}}
              >Create a Job</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const authCondition = (authUser) => !!authUser


export default withAuthorization(authCondition)(Jobs)