import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import { PageHeader } from '../components/PageHeader'

class Jobs extends Component {
  render() {
    return (
      <React.Fragment>
        <PageHeader pageTitle="Hire a Crew" />
        <div className="container">
        <h2 className="component-title">All Jobs</h2>
        <p className="component-text">View current or pending jobs here or create a new job.</p>
        </div>
      </React.Fragment>
    )
  }
}

const authCondition = (authUser) => !!authUser


export default withAuthorization(authCondition)(Jobs)