import React from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const Login = ({ state, handleChange, history, signUserIn, error }) => {
  return (
    <form onSubmit={(e) => signUserIn(state.email, state.password, history, e)}> 
      <FormTextInput
        label="Email"
        name="email"
        onChange={handleChange}
        errorMsg="Please enter your valid account email address"
        className={state.emailInputClass}
        type="email"
      />
      <FormTextInput
        label="password"
        name="password"
        onChange={handleChange}
        errorMsg="Please enter your valid account password"
        className={state.emailPasswordClass}
        type="password"
      />
      <FormButton
        className="button-form"
        buttonText="Login"
      />
    </form>
  )
}

export const LoginText = () => {
  return (
    <React.Fragment>
      <h2>Welcome back</h2>
      <p>Log in to get to work.</p>
    </React.Fragment>
  )
}

export const ForgotPassword = () => {
  return (
    <Link to="/password-reset">
      <a>Forgot your password?</a>
    </Link>
  )
}