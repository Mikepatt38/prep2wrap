import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import logo from '../../img/calltime-logo.png'

export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUserIn, error, errorText } = this.props
    return (
      <div className="authPage">
        <div className="auth-container">
          <div className="auth-logo">
            <img src={logo} alt="The official logo" />
          </div>
          <div className="auth-card">
            <div className="auth-card-body">
              { error && <p className="error-text">{errorText}</p> }
              <LoginForm
                history={history}
                signUserIn={signUserIn}
                state={this.state}
                handleChange={this.handleChange}
                error={error}
              />
            </div>
            <div className="auth-card-footer">
              <Link to="/password-reset">
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

const LoginForm = ({ history, signUserIn, state, handleChange, error}) => (
  <form onSubmit={(e) => signUserIn(state.email, state.password, history, e)}> 
    <FormTextInput
      label="Email"
      name="email"
      onChange={handleChange}
      className={error && 'field-error'}
      type="email"
    />
    <FormTextInput
      label="password"
      name="password"
      onChange={handleChange}
      className={error && 'field-error'}
      type="password"
    />
    <FormButton
      className="button-form"
      buttonText="Login"
    />
  </form>
)
