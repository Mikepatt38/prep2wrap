import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import UserProfileModal from '../components/Users/UserProfileModal'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'
import UserCurrentCard from '../components/Settings/UserCurrentCard'
import DeleteUserAccountForm from '../components/Settings/UserDeleteAccountForm'
import { isThisQuarter } from 'date-fns'
import PasswordChangeForm from '../components/Auth/PasswordChangeForm'

class AccountSettings extends Component {
  state = {
    user: {},
    modalActive: false
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({
        user: this.props.currentUser
      })
    }
  }

  handleViewProfile = (user) => {
    console.log(user)
    this.setState({
      user: user,
      modalActive: true
    })
  }
  
  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    return (
      <React.Fragment>
        <UserProfileModal
          currentUser={this.props.currentUser}
          updateUserFavorites={this.props.updateUserFavorites}
          active={this.state.modalActive}
          user={this.state.user}
          close={this.toggleModal}
        />
        <div className="app-page">
  
        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="link">Dashboard</Link>
              <Link to="/availability" className="link">Availability</Link>
              <Link to="/jobs" className="link">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/account-settings" className="active">Settings</Link>
            </div>
            <button className="button button-workspace" onClick={() => this.handleViewProfile(this.props.currentUser)}>View Profile</button>
          </div>
        </div>
        <div className="app-page-body">
  
          <div className="app-page-section section-grid">
            <div className="card card-grid">
              <div className="card-body">
                <h4>Basic Account Settings</h4>
                <UserInfoForm
                  currentUser={this.props.currentUser}
                  setName={this.props.setName}
                  setEmail={this.props.setEmail}
                  setMobileNumber={this.props.setMobileNumber}
                  uploadProfileImage={this.props.uploadProfileImage}
                />
              </div>
            </div>
            <div className="card card-grid card-stacked">
              <div className="card-body">
                <h4>Your Default Payment Option</h4>
                <UserCurrentCard 
                  currentUser={this.props.currentUser}
                  updateUserCardInfo={this.props.updateUserCardInfo}
                />
              </div>
              <div className="card-body">
                <h4 className="no-margin">Reset Your Current Password</h4>
                <PasswordChangeForm
                  updateUserPassword={this.props.updateUserPassword}
                />
              </div>
            </div>
            <div className="card card-grid card-grid--full-width">
              <div className="card-body">
                <h4>User Profile</h4>
                <UserProfileForm
                  setUserProfile={this.props.setUserProfile} 
                  currentUser={this.props.currentUser} 
                  onClick={(e) => handleClick(e)}
                />
              </div>
            </div>
            <div className="card card-grid card-grid--full-width">
              <div className="card-body">
                <h4>Delete Your Account</h4>
                <p>The deletion of your account is permanent: once deleted, your account as well as all of your projects, results, crons, reports and other information linked to your account will be removed from our servers and won't be recoverable. You will be able to create a new account later on if you wish to do so, but none of the information from your current account will transfer over to your new account.</p>
                <DeleteUserAccountForm
                  deleteUserAccount={this.props.deleteUserAccount}
                  history={this.props.history}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}


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