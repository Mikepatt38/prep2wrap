import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import UserProfileModal from '../components/Users/UserProfileModal'
import UserProfileForm from '../components/Settings/UserProfileForm'
import UserInfoForm from '../components/Settings/UserInfoForm'
import DeleteUserAccountForm from '../components/Settings/UserDeleteAccountForm'

class AccountSettings extends Component {
  state = {
    user: {},
    modalActive: false
  }

  handleViewProfile = (user) => {
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
            <button className="button button-workspace" onClick={() => this.handleViewProfile(this.props.currentUser)}>View Live Profile</button>
          </div>
        </div>
        <div className="app-page-body">
  
          <div className="app-page-section section-grid">
            <div className="card card-grid">
              <div className="card-body">
                <h4>Basic account settings</h4>
                <UserInfoForm
                  currentUser={this.props.currentUser}
                  setName={this.props.setName}
                  setEmail={this.props.setEmail}
                  setMobileNumber={this.props.setMobileNumber}
                  uploadProfileImage={this.props.uploadProfileImage}
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