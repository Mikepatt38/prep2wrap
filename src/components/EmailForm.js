import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const EmailForm = ({ state, id, setEmail, handleChange }) => {

  return (
    <form
      onSubmit={setEmail}
      className="form-account-body--general"
    >
      <FormTextInput
        label="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={state.email}
      />
      <FormButton
        onClick={(e) => setEmail(id, state.email, e)}
        className="button-primary"
        buttonText="Update Email"
      />
    </form>
  )
}