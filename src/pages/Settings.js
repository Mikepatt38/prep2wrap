import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { NameForm, InlineForm } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import { Card } from '../components/Card'
import { UserProfileForm, ProfileDisplayed } from '../components/UserProfileForm'
import UserInfoForm from '../components/UserInfoForm'

class AccountSettings extends Component {

  render() {
    const { currentUser, setModal, setName } = this.props

    return (
      <div className="container">
        <h1 className="page-title">Account Settings</h1>
        <div className="settings">
          <div className="card">
            <div className="card-header">
              <h2>Basic Information <button onClick={() => setModal(true, "Update account information", 
                <UserInfoForm setName={setName} currentUser={currentUser} />)} className="button-primary button-card">Update</button>
              </h2>
              <p>Your basic account information, hover over the text to update the field.</p>
            </div>
            <div className="card-item">
              <label>Account Name: </label>
              <p> {currentUser.firstName} {currentUser.lastName}</p>
            </div>
            <div className="card-item">
              <label>Account Email: </label>
              <p> {currentUser.email}</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings