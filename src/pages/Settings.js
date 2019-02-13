import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'

const AccountSettings = ({ currentUser, setUserProfile, setName, setEmail, setMobileNumber, uploadProfileImage }) => (
  <div className="container containerMargin">
    <div className="card">
      <div className="card-header">
        <h3>Basic Details</h3>
        <p>Your basic account information, you can update this information at any time to keep your account up to date.</p>    
      </div>
      <div className="card-body">
        <UserInfoForm
          currentUser={currentUser}
          setName={setName}
          setEmail={setEmail}
          setMobileNumber={setMobileNumber}
          uploadProfileImage={uploadProfileImage}
        />
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>Profile Settings</h3>
        <p>Update your profile settings at any time to keep your profile up to date for potential connections.</p>
      </div>
      <div className="card-body">
        <UserProfileForm 
          setUserProfile={setUserProfile} 
          currentUser={currentUser} 
          onClick={this.handleClick}
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