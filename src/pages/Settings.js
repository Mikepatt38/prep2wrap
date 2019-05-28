import React from 'react'
import PropTypes from 'prop-types'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'
import DeleteUserAccountForm from '../components/Settings/UserDeleteAccountForm'

const AccountSettings = ({ currentUser, setUserProfile, setName, setEmail, setMobileNumber, setModal, closeModal, uploadProfileImage, deleteUserAccount, reAuthenticateUser, history }) => (
  <div className="app-page">

    <div className="app-page-header">
      <h1>Account Settings</h1>
    </div>

    <div className="app-page-body">
      <p>Easily update your user settings and public profile information to keep your account up to date.</p>
      <div className="account-settings">
        <div className="account-settings-user">
          <div className="card">
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
        </div>

        <div className="account-settings-profile">
          <div className="card">
            <div className="card-body">
              <p>Set up your profile job settings to get hired where you fit in.</p>
              <UserProfileForm 
                setUserProfile={setUserProfile} 
                currentUser={currentUser} 
                onClick={(e) => handleClick(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
)

// <div className="app-page-section">
// <div className="card no-hover">
//   <UserInfoForm
//     currentUser={currentUser}
//     setName={setName}
//     setEmail={setEmail}
//     setMobileNumber={setMobileNumber}
//     uploadProfileImage={uploadProfileImage}
//   />
// </div>
// </div>

// <div className="app-page-section">
// <div className="card no-hover">
//   <UserProfileForm 
//     setUserProfile={setUserProfile} 
//     currentUser={currentUser} 
//     onClick={(e) => handleClick(e)}
//   />
// </div>
// </div>

// <div className="app-page-section">
// <DeleteUserAccountForm
//   deleteUserAccount={deleteUserAccount}
//   setModal={setModal}
//   closeModal={closeModal}
//   history={history}
// />
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