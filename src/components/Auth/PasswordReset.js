import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import logo from '../../img/prep2wrap-purple-logo.png'
import LoadingModal from '../General/LoadingModal'
import ButtonLoadingIcon from '../../img/icon-button-loading.svg'

export class PasswordReset extends Component {
  state = {
    buttonLoading: false,
    email: '',
    success: false,
    error: false,
    errorMessage: ''
  }

  componentWillUnmount = () => {
    this.setState({
      buttonLoading: false,
      email: '',
      success: false,
      error: false,
      errorMessage: ''
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validateUserEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(String(email).toLowerCase())
  }

  handlePasswordReset = (e) => {
    e.preventDefault()
    this.setState({
      buttonLoading: true
    })
    if (this.validateUserEmail(this.state.email)) {
      this.props.resetPassword(this.state.email).then((results) => {
        this.setState({
          buttonLoading: false,
          success: true,
          successMessage: 'The password reset Link has been sent'
        })
        if (!results) {
          this.setState({
            error: true,
            errorMessage: 'There was an error with your request',
          })
        }
      })
    }
    else {
      this.setState({
        error: true,
        errorMessage: 'Please provide the current email from your account.',
        buttonLoading: false
      })
    }
  }

  render() {
    const { error, errorMessage, success, successMessage } = this.state
    return (
      <div className="authPage">
        <LoadingModal
          active={this.state.modalActive}
          message="One moment. We are updating your password."
        />
        <div className="auth-logo">
          <img src={logo} alt="The official logo" />
        </div>
        <div className="auth-container">
          <div className="auth-header">
            <h1>Reset Password</h1>
            <p>We will send a password reset link to the email associated with your account.</p>
          </div>
          <div className="auth-card">
            <div className="auth-card-body">
              {success && <p className="success-text">{successMessage}</p>}
              {error && <p className="error-text">{errorMessage}</p>}
              <PasswordResetForm
                handlePasswordReset={this.handlePasswordReset}
                handleChange={this.handleChange}
                error={error}
                state={this.state}
                didUserProvideEmail={this.didUserProvideEmail}
              />
            </div>
          </div>
          <div className="auth-external-link">
            <p>Your password is updated?</p> &nbsp;
            <Link to="/signup" className="link">
              Login here
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const PasswordResetForm = ({ handlePasswordReset, handleChange, error, state, didUserProvideEmail }) => (
  <form method="form">
    <FormTextInput
      label="Email"
      name="email"
      onChange={handleChange}
      className={error ? 'field-error' : ''}
      type="text"
    />
    <FormButton
      onClick={(e) => handlePasswordReset(e)}
      className={state.buttonLoading ? 'button-primary button-updating auth' : 'button-primary auth'}
      buttonText={state.buttonLoading ? <React.Fragment><img src={ButtonLoadingIcon} alt="Search Button Loading Icon" /> Sending</React.Fragment> : 'Send Password Reset Link'}
      disabled={state.buttonLoading ? false : !state.email.length}
    />
  </form>
)
