import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import logo from '../../img/prep2wrap-purple-logo.png'

export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.props.error && this.props.resetErrors(false, '', '') 
  }

  handleSignUserIn = (e) =>{
    e.preventDefault()
    this.props.resetErrors(false, '', '')
    this.props.signUserIn(this.state.email, this.state.password, this.props.history)
  }

  render() {
    const { error, errorText, errorType } = this.props
    return (
      <div className="authPage">
        <div className="auth-logo">
          <img src={logo} alt="The official logo" />
        </div>
        <div className="auth-container">
          <div className="auth-header">
            <h1>Welcome back.</h1>
          </div>
          <div className="auth-card">
            <div className="auth-card-body">
              { error && <p className="error-text">{errorText}</p> }
              <LoginForm
                handleSignUserIn={this.handleSignUserIn}
                handleChange={this.handleChange}
                error={error}
                errorType={errorType}
              />
            </div>
            <div className="auth-card-footer">
              <Link to="/login">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="auth-external-link">
            <p>Don't have an account?</p> &nbsp;
            <Link to="/signup" className="link">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const LoginForm = ({ handleSignUserIn, handleChange, error, errorType}) => (
  <form onSubmit={(e) => handleSignUserIn(e)}> 
    <FormTextInput
      label="Email"
      name="email"
      onChange={handleChange}
      className={error && errorType === 'Error' ? 'field-error' : ''}
      type="email" 
      placeholder="user@email.com"
    />
    <FormTextInput
      label="Password"
      name="password"
      onChange={handleChange}
      className={error && errorType === 'Error' ? 'field-error' : ''}
      type="password"
      placeholder="password"
    />
    <FormButton
      className="button-primary auth"
      buttonText="Login"
    />
  </form>
)
