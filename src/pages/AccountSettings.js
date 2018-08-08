import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormTextInput} from '../components/FormTextInput'
import {FormButton} from '../components/FormButton'
import withAuthorization from '../js/components/withAuthorization'

const NameForm = ({state, id, setName, handleChange, onGeneralEdit}) => {
  return (
    <form
      method="form"
      className="form-account-body--general"
    >
      <FormTextInput
        label="First Name"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={state.firstName}
        disabled={!state.nameEditable}
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={state.lastName}
        disabled={!state.nameEditable}
      />
      <FormButton
        onClick={onGeneralEdit}
        className={!state.nameEditable ? 'btn-form' : 'btn btn-hidden'}
        buttonText="Edit"
      />
      <FormButton
        onClick={(e) => setName(id, state.firstName, state.lastName, e)}
        className={!state.nameEditable ? 'btn btn-hidden' : 'btn-form'}
        buttonText="Update Name"
      />
    </form>
  )
}

const EmailForm = ({ state, id, setEmail, handleChange, onEmailEdit }) => {
  return (
    <form
      onSubmit={setEmail}
      className="form-account-body--general"
    >
      <FormTextInput
        label="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={state.email}
        disabled={!state.emailEditable}
      />
      <FormButton
        onClick={onEmailEdit}
        className={!state.emailEditable ? 'btn-form btn-short' : 'btn btn-hidden'}
        buttonText="Edit"
      />
      <FormButton
        onClick={(e) => setEmail(id, state.email, e)}
        className={!state.emailEditable ? 'btn btn-hidden' : 'btn-form btn-short'}
        buttonText="Update Email"
      />
    </form>
  )
}

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