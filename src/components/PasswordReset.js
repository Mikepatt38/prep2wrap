import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

const margin = {
  marginBottom: '50px'
}

export const PasswordReset = ({ email, error, handleChange, resetPassword }) => {
  return (
    <form onSubmit={(e) => resetPassword(email, e)} style={margin}>
      <legend style={margin}>Reset Your Password</legend>
      <FormTextInput
        label="Email"
        name="email"
        onChange={handleChange}
        type="text"
      />
      <FormButton
        className="button-primary"
        buttonText="Send Reset Password Link"
      />
      {error && <p>{error.message}</p>}
    </form>
  )
}