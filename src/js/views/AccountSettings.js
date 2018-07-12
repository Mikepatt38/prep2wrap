import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'

class AccountSettings extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-title">Account Settings</h1>
        <div className="grid">
          <div className="grid-row">
          
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountSettings)