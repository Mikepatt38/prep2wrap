import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import LoginIllustration from '../img/illustration-login.svg'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUserIn, logo } = this.props
    return (
      <div className="page-background">
        <div className="modal authModal">
          <div className="modalIllustration">
            <div className="illustration">
              <img src={LoginIllustration} alt="Login Illustration" />
            </div>
            <div className="illustration-text">
              <h3>Grow your career and network.</h3>
              <p>State governments could have money that's owed to you. Click your "Resources" tab to get started.</p>
            </div>
          </div>
          <div className="modalForm">
            <div className="modal-header">
              <h2>Hey, welcome back!</h2>
              <p>Login and get started with your network.</p>
            </div>
            <div className="modal-body">
              <LoginForm
                history={history}
                signUserIn={signUserIn}
                state={this.state}
              />
            </div>
            <div className="modal-footer">
              <ForgotPassword />
              <hr />
              <p className="info">Not a member yet?</p>
              <Link to="/signup" className="link">
                Sign up now to get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const LoginForm = ({ history, signUserIn, state}) => (
  <form onSubmit={(e) => signUserIn(state.email, state.password, history, e)}> 
    <FormTextInput
      label="Email"
      name="email"
      onChange={this.handleChange}
      errorMsg="Please enter your valid account email address"
      className={state.emailError}
      type="email"
    />
    <FormTextInput
      label="password"
      name="password"
      onChange={this.handleChange}
      errorMsg="Please enter your valid account password"
      className={state.passwordError}
      type="password"
    />
    <FormButton
      className="button-form"
      buttonText="Login"
    />
  </form>
)

const ForgotPassword = () => {
  return (
    <Link to="/password-reset">
      <a>Forgot your password?</a>
    </Link>
  )
}