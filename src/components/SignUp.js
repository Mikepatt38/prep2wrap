import React from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const SignUp = ({ state, handleChange, history, signUpUser }) => {
  return (
    <form
      method="post"
      onSubmit={(e) => signUpUser(state.email, state.passwordOne, state.firstName, state.lastName, history, e)}
    >
      <legend>Get Started Today!</legend>
      <div className="form-link">
        Already A Member? &nbsp;
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
      <FormTextInput
        label="First Name"
        name="firstName"
        onChange={handleChange}
        type="text"
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        type="text"
      />
      <FormTextInput
        label="Email Bithc"
        name="email"
        onChange={handleChange}
        type="email"
      />
      <FormTextInput
        label="Password"
        name="passwordOne"
        onChange={handleChange}
        type="password"
      />
      <FormTextInput
        label="Confirm Password"
        name="passwordTwo"
        onChange={handleChange}
        type="password"
      />
      <FormButton
        className="btn-form"
        buttonText="Create Account"
      />
      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}