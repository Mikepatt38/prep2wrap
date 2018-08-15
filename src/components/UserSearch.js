import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const UserSearch = ({ state, handleChange, searchUsersByName }) => {
  return (
    <form
      method="form"
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
        onClick={(e) => searchUsersByName(state.firstName, state.lastName, e)}
        className="btn-form"
        buttonText="Search For Users"
      />
    </form>
  )
}