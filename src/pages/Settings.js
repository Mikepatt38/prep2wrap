import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm, { ProfileDisplayed } from '../components/UserProfileForm'
import UserInfoForm from '../components/UserInfoForm'
import { PageHeader } from '../components/PageHeader'
import { ProfileImageUpload } from '../components/ProfileImageUpload'

const styles = {
  marginBottom: '50px'
}

const AccountSettings = ({ currentUser, setModal, setName, setEmail, setUserProfile, uploadProfileImage  }) => {
  return (
    <React.Fragment>
      <PageHeader pageTitle="Account Settings" />
      <div className="container">
        <div className="settings">

          <div style={styles}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Basic Information</h2>
                <p className="card-subtitle">Your basic account information, hover over the text to update the field.</p>
              </div>
              <div className="card-item">
                <div className="card-item-info">
                  <label>Account Profile Image: </label>
                  { currentUser.avatar ? <img src={currentUser.avatar} alt="User Profile Image" /> : <p>Upload a profile image</p> }
                </div>
                <span><a role="button" onClick={() => setModal(true, currentUser.avatar ? 'Edit your profile image.' : 'Upload your profile image.' , 
                  <ProfileImageUpload currentUser={currentUser} uploadProfileImage={uploadProfileImage} />)}>{ currentUser.avatar ? 'Edit' : 'Upload' }</a>
                </span>
              </div>
              <div className="card-item">
                <div className="card-item-info">
                  <label>Account Name: </label>
                  <p> {currentUser.firstName} {currentUser.lastName}</p>
                </div>
                <span><a role="button" onClick={() => setModal(true, "Update account name", 
                  <UserInfoForm setName={setName} setEmail={null} currentUser={currentUser} />)}>Edit</a>
                </span>
              </div>
              <div className="card-item">
                <div className="card-item-info">
                  <label>Account Email: </label>
                  <p> {currentUser.email}</p>
                </div>
                <span><a role="button" onClick={() => setModal(true, "Update account email", 
                  <UserInfoForm setName={null} setEmail={setEmail} currentUser={currentUser} />)}>Edit</a>
                </span>
              </div>
            </div>
          </div>

          <div style={styles}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">User Profile</h2>
                <p className="card-subtitle">Your public profile information, it can be updated at any time.</p>
              </div>
              <div className="card-item">
                <ProfileDisplayed currentUser={currentUser} />
                <span><a role="button" onClick={() => setModal(true, "Update profile information", 
                  <UserProfileForm setUserProfile={setUserProfile} currentUser={currentUser} />)}>Edit</a>
                </span>
              </div>
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