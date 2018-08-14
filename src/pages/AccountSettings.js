import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NameForm } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import { UserProfileForm } from '../components/UserProfileForm'

class AccountSettings extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,
    nameEditable: false,
    profileEditable: false,
    username: this.props.currentUser.username === undefined ? '' : this.props.currentUser.username,
    location: this.props.currentUser.location === undefined ? '' : this.props.currentUser.location,
    headline: this.props.currentUser.headline === undefined ? '' : this.props.currentUser.headline,
    skills: this.props.currentUser.skills === undefined ? '' : this.props.currentUser.skills,
    fbLink: this.props.currentUser.fbLink === undefined ? '' : this.props.currentUser.fbLink,
    imdbLink: this.props.currentUser.imdbLink  === undefined ? '' : this.props.currentUser.imdbLink,
    availability: this.props.currentUser.availability === undefined ? false : this.props.currentUser.availability,
    bilingual: this.props.currentUser.bilingual === undefined ? false : this.props.currentUser.bilingual,
    travel: this.props.currentUser.travel === undefined ? false : this.props.currentUser.travel,
    union: this.props.currentUser.union === undefined ? false : this.props.currentUser.union,
    formMessage: 'This is your public profile information, it can be updated at any time.'
  }

  componentWillUnmount = () => {
    this.props.setAlert(false, '', '')
    this.props.setAccountView('general')
  }

  onGeneralEdit = (e) => {
    e.preventDefault()
    this.setState({ nameEditable: true })
  }

  onProfileEdit = (e) => {
    e.preventDefault()
    this.setState ({ profileEditable: true })
  }

  onEmailEdit = (e) => {
    e.preventDefault()
    this.setState({ emailEditable: true })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = e => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  render() {
    const { setName, setEmail, currentUser, accountView, setAccountView, setUserProfile } = this.props
    console.log(this.state)
    return (
      <div className="container">
        <div className="account-settings-container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            <div className="grid-account-nav">
              <ul>
                <li className={accountView === 'general' ? 'active' : ''} onClick={() => setAccountView('general')}>General</li>
                <li className={accountView === 'profile' ? 'active' : ''} onClick={() => setAccountView('profile')}>Profile</li>
                <li>Billing</li>
              </ul>
            </div>
            { accountView === 'general' && 
              <div className="grid-account-body grid-account-body--general">
                <div className="grid-account-body--header">
                  <p>This is your general account information, it can be updated at any time.</p>            
                </div>
                <div className="grid-account-body--name">
                  <NameForm state={this.state} id={currentUser.id} setName={setName} handleChange={this.handleChange} onGeneralEdit={this.onGeneralEdit} />
                </div>
                <div className="grid-account--email">
                  <p>This is your account's email address, it can be updated at any time.</p>     
                    <EmailForm state={this.state} id={currentUser.id} setEmail={setEmail} handleChange={this.handleChange} onEmailEdit={this.onEmailEdit} />
                </div>
              </div>
            }
            { accountView === 'profile' &&
              <div className="grid-account-body grid-account-body--profile">
                <div className="grid-account-body--header">
                  <p>This is your public profile information, it can be updated at any time.</p>      
                  <UserProfileForm state={this.state} id={currentUser.id} setUserProfile={setUserProfile} handleChange={this.handleChange} handleCheck={this.handleCheck} onProfileEdit={this.onProfileEdit} />
                </div>
              </div>
            }
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