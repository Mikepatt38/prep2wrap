import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NameForm } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import withAuthorization from '../containers/withAuthorization'

class AccountSettings extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,
    nameEditable: false
  }

  onGeneralEdit = (e) => {
    e.preventDefault()
    this.setState({ nameEditable: true })
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

  render() {
    const { setName, setEmail, currentUser } = this.props
    return (
      <div className="container">
        <div className="account-settings-container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            {/* <div className="grid-account-nav">
              <ul>
                <li className={accountView === 'general' ? 'active' : ''} onClick={() => setAccountView('general')}>General</li>
                <li className={accountView === 'profile' ? 'active' : ''} onClick={() => setAccountView('profile')}>Profile</li>
                <li>Billing</li>
              </ul>
            </div> */}
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

const authCondition = (authUser) => !!authUser

export default AccountSettings