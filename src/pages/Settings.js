import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'
import DeleteUserAccountForm from '../components/Settings/UserDeleteAccountForm'

function AccountSettings({currentUser, setUserProfile, setName, setEmail, setMobileNumber, setModal, closeModal, uploadProfileImage, deleteUserAccount, reAuthenticateUser, history}){
  return (
    <div className="app-page">

      <div className="app-page-header">
        <h1>Account Settings</h1>
      </div>
      <div className="app-page-body">

        <div className="app-page-section" id="section-grid">
          <div className="card card-grid">
            <div className="card-body">
              <h4>Basic account settings</h4>
              <UserInfoForm
                currentUser={currentUser}
                setName={setName}
                setEmail={setEmail}
                setMobileNumber={setMobileNumber}
                uploadProfileImage={uploadProfileImage}
              />
            </div>
          </div>
          <div className="card card-grid">
            <div className="card-body">
              <h4>Text Message Notifications</h4>
              <p>These values will help other crew members understand what jobs you are the best fit for.</p>
              <p>Your number will not be used for spam or any other form of abuse. Only to altert you of your job listings on the application.</p>
            </div>
          </div>
          <div className="card card-grid card-grid--full-width">
            <div className="card-body">
              <h4>User Profile</h4>
              <UserProfileForm
                setUserProfile={setUserProfile} 
                currentUser={currentUser} 
                // onClick={(e) => handleClick(e)}
              />
            </div>
          </div>
          <div className="card card-grid card-grid--full-width">
            <div className="card-body">
              <h4>Delete Your Account</h4>
              <p>The deletion of your account is permanent: once deleted, your account as well as all of your projects, results, crons, reports and other information linked to your account will be removed from our servers and won't be recoverable. You will be able to create a new account later on if you wish to do so, but none of the information from your current account will transfer over to your new account.</p>
              <DeleteUserAccountForm
                deleteUserAccount={deleteUserAccount}
                history={history}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// <div className="app-page-section">
// <UserProfileForm 
//   setUserProfile={setUserProfile} 
//   currentUser={currentUser} 
//   onClick={(e) => handleClick(e)}
// />
// </div>

// <div className="app-page-section">
// <div className="card">
//   <div className="card-body">
//     <DeleteUserAccountForm
//       deleteUserAccount={deleteUserAccount}
//       history={history}
//     />
//   </div>
// </div>
// </div>


const handleClick = async (e) => {
  e.preventDefault()
  this.props.setUserProfile(this.props.currentUser.id, this.state.username, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.availability, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages, e)
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings