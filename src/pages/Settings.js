import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm, { ProfileDisplayed } from '../components/UserProfileForm'
import UserInfoForm from '../components/UserInfoForm'
import { PageHeader } from '../components/PageHeader'
import CheckIcon from '../img/icon-check.svg'

const styles = {
  marginBottom: '50px'
}

const AccountSettings = ({ currentUser, setModal, setName, setEmail, setUserProfile  }) => {
  return (
    <React.Fragment>
      <PageHeader pageTitle="Account Settings" />
      <div className="container">
        <div className="settings">

          <div style={styles}>
            <h2 className="component-title">Basic Information</h2>
            <p className="component-text">Your basic account information, hover over the text to update the field.</p>
            <div className="component-section">
              <div className="card-item">
                <label>Account Name: </label>
                <p> {currentUser.firstName} {currentUser.lastName}</p>
              </div>
              <div className="card-item">
                <label>Account Email: </label>
                <p> {currentUser.email}</p>
              </div>
              <button onClick={() => setModal(true, "Update account information", 
                <UserInfoForm setName={setName} setEmail={setEmail} currentUser={currentUser} />)} className="button-card button-primary">Update
              </button>
            </div>
          </div>

          <div style={styles}>
            <h2 className="component-title">User Profile</h2>
            <p className="component-text">Your public profile information, it can be updated at any time.</p>
            <div className="component-section">
              <ProfileDisplayed currentUser={currentUser} />
              <button onClick={() => setModal(true, "Update profile information", 
                <UserProfileForm setUserProfile={setUserProfile} currentUser={currentUser} />)} className="button-primary button-card">Update
              </button>
            </div>
          </div>

        </div>
      </div>   
    </React.Fragment>  
  )
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings