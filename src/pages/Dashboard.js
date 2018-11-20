import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'
import { PageHeader } from '../components/PageHeader'

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="page-title">Welcome, UserDashboard</h1>
        </div>
      </React.Fragment>
    )
  }
}

const authCondition = (authUser) => !!authUser


export default withAuthorization(authCondition)(Dashboard)