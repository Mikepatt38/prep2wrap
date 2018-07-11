import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'

class AccountSettings extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <h1>Account Settings</h1>
        </div>
      </section>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AccountSettings)