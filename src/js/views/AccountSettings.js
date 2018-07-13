import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'
import AccountSettingsForm from '../components/AccountSettingsForm'

class AccountSettings extends Component {

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <h1 className="page-title">Account Settings</h1>
        <AccountSettingsForm />
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountSettings)