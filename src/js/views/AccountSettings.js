import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'
import GeneralInfoForm from '../components/GeneralInfoForm'
import ProfileSettingsForm from '../components/ProfileSettingsForm';

class AccountSettings extends Component {
  state = {
    accountBodyActive: true
  }

  

  render() {
    const { accountBodyActive } = this.state
    return (
      <div className="container">
        <div className="account-settings-container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            <div className="grid-account-nav">
              <ul>
                <li className={accountBodyActive ? 'active' : ''} onClick={() => this.setState({ accountBodyActive: true })}>General</li>
                <li className={accountBodyActive ? '' : 'active'} onClick={() => this.setState({ accountBodyActive: false })}>Profile</li>
                <li>Billing</li>
              </ul>
            </div>
            { accountBodyActive 
              ? <GeneralInfoForm />
              : <ProfileSettingsForm />
            }
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountSettings)