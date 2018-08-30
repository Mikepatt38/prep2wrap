import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const NameForm = ({state, id, setName, handleChange, onGeneralEdit}) => {
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
        disabled={!state.nameEditable}
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={state.lastName}
        disabled={!state.nameEditable}
      />
      <FormButton
        onClick={onGeneralEdit}
        className={!state.nameEditable ? 'button-primary' : 'button button-hidden'}
        buttonText="Edit"
      />
      <FormButton
        onClick={(e) => setName(id, state.firstName, state.lastName, e)}
        className={!state.nameEditable ? 'button button-hidden' : 'button-primary'}
        buttonText="Update Name"
      />
    </form>
  )
}