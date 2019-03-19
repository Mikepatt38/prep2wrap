import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'

const AccountSettings = ({ currentUser, setUserProfile, setName, setEmail, setMobileNumber, uploadProfileImage, setGlobalAlert }) => (
  <div className="app-page">
    <div className="app-page-title">
      <h1>Account Settings</h1>
    </div>

    <div className="app-page-section">
      <div className="section-title">
        <h3>Basic Account Information:</h3>
      </div>  
      <div className="card no-hover">
        <UserInfoForm
          currentUser={currentUser}
          setName={setName}
          setEmail={setEmail}
          setMobileNumber={setMobileNumber}
          uploadProfileImage={uploadProfileImage}
        />
      </div>
    </div>

    <div className="app-page-section">
      <div className="section-title">
        <h3>User Profile Information:</h3>
      </div>
      <div className="card no-hover">
        <UserProfileForm 
          setUserProfile={setUserProfile} 
          currentUser={currentUser} 
          onClick={(e) => handleClick(e)}
          setGlobalAlert={setGlobalAlert}
        />
      </div>
    </div>

  </div>
)

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