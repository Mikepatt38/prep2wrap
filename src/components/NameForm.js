import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const NameForm = ({state, id, setName, handleChange}) => {
  return (
    <form
      method="form"
      className="form-account-body--general"
    >
      <FormTextInput
        label="First Name"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={state.firstName}
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={state.lastName}
      />
      <FormButton
        onClick={(e) => setName(id, state.firstName, state.lastName, e)}
        className="button-primary"
        buttonText="Update Name"
      />
    </form>
  )
}