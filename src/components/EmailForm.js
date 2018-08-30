import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const EmailForm = ({ state, id, setEmail, handleChange, onEmailEdit }) => {
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
        disabled={!state.emailEditable}
      />
      <FormButton
        onClick={onEmailEdit}
        className={!state.emailEditable ? 'button-primary' : 'button button-hidden'}
        buttonText="Edit"
      />
      <FormButton
        onClick={(e) => setEmail(id, state.email, e)}
        className={!state.emailEditable ? 'button button-hidden' : 'button-primary'}
        buttonText="Update Email"
      />
    </form>
  )
}