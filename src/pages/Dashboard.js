import React, { Component } from 'react'
import withAuthorization from '../containers/withAuthorization'

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-title">Welcome, UserDashboard</h1>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser


export default withAuthorization(authCondition)(Dashboard)