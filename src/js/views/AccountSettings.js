import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'
import AccountSettingsForm from '../components/AccountSettingsForm'

class AccountSettings extends Component {
  state = {
    accountBodyActive: 'general'
  }

  render() {
    return (
      <div className="container">
        <div className="account-settings-container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            <div className="grid-account-nav">
              <ul>
                <li className="active">General</li>
                <li>Profile</li>
                <li>Billing</li>
              </ul>
            </div>
            <AccountSettingsForm />
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountSettings)