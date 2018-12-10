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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
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
                handleChange={this.handleChange}
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

const LoginForm = ({ history, signUserIn, state, handleChange}) => (
  <form onSubmit={(e) => signUserIn(state.email, state.password, history, e)}> 
    <FormTextInput
      label="Email"
      name="email"
      onChange={handleChange}
      errorMsg="Please enter your valid account email address"
      className={state.emailError}
      type="email"
    />
    <FormTextInput
      label="password"
      name="password"
      onChange={handleChange}
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
      Forgot your password?
    </Link>
  )
}