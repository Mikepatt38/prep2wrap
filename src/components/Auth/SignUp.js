import React, { Component } from 'react'
import { SignUpMultiStepForm } from './SignUpMultiStepForm'
import logo from '../../img/calltime-logo.png'

export class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUpUser, currentUser, setUserProfile, error, errorText, resetErrors } = this.props
    return (
      <div className="authPage">
        <div className="authContainer auth-container--signup">
          <div className="auth-logo">
            <img src={logo} alt="The official logo" />
          </div>
          <SignUpMultiStepForm
            history={history}
            signUpUser={signUpUser}
            currentUser={currentUser}
            setUserProfile={setUserProfile}
            error={error}
            errorText={errorText}
            resetErrors={resetErrors}
          />
        </div>
      </div>
    )
  }
}
