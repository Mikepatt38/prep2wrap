import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const PasswordReset = ({ email, state, error, handleChange, resetPassword }) => {
  return (
    <form onSubmit={(e) => resetPassword(email, e)}>
      <FormTextInput
        label="Email"
        name="email"
        onChange={handleChange}
        errorMsg="Please enter your valid account email address"
        className={state.emailInputClass}
        type="text"
      />
      <FormButton
        className="button-form"
        buttonText="Send Reset Password Link"
      />
    </form>
  )
}

export const PasswordResetText = () => {
  return (
    <React.Fragment>
      <h2>Oh no!</h2>
      <p>Provide account email to receive a password reset link.</p>
    </React.Fragment>
  )
}
