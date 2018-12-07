import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

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
        <div className="modal" id="static">
          <div className="modal-header">
            <img src={logo} alt="Calltime Logo" />
            <h2>Welcome back!</h2>
            <p>Log in to get started building your jobs and network..</p>
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