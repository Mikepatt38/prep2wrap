import React from 'react'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormButton } from './FormButton'

export const UserProfileForm = ({ state, id, setUserProfile, handleChange, handleCheck, onProfileEdit }) => {
  return (
    <form className="form-account-body--profile">
      <FormTextInput 
        label="Username"
        name="username"
        type="text"
        onChange={handleChange}
        value={state.username}
        disabled={!state.profileEditable}
      />
      <FormTextInput 
        label="Location"
        name="location"
        type="text"
        onChange={handleChange}
        value={state.location}
        disabled={!state.profileEditable}
      />
      <FormTextInput 
        label="Profile Headline"
        name="headline"
        type="text"
        onChange={handleChange}
        value={state.headline}
        disabled={!state.profileEditable}
      />
      <FormTextInput 
        label="Skills"
        name="skills"
        type="text"
        onChange={handleChange}
        value={state.skills}
        placeholder="Type Skills seperated by a comma"
        disabled={!state.profileEditable}
      />
      <FormTextInput 
        label="Facebook Profile Link"
        name="fbLink"
        type="text"
        onChange={handleChange}
        value={state.fbLink}
        disabled={!state.profileEditable}
      />
      <FormTextInput 
        label="IMDb Profile Link"
        name="imdbLink"
        type="text"
        onChange={handleChange}
        value={state.imdbLink}
        disabled={!state.profileEditable}
      />
      <FormCheckboxInput
        label="Willing To Travel"
        checkboxId="travel"
        onChange={handleCheck}
        value={state.travel}
        disabled={!state.profileEditable}
      />
      <FormCheckboxInput
        label="Daily Availability"
        checkboxId="availability"
        onChange={handleCheck}
        value={state.availability}
        disabled={!state.profileEditable}
      />
      <FormCheckboxInput
        label="Bilingual"
        checkboxId="bilingual"
        onChange={handleCheck}
        value={state.bilingual}
        disabled={!state.profileEditable}
      />
      <FormCheckboxInput
        label="Union"
        checkboxId="union"
        onChange={handleCheck}
        value={state.union}
        disabled={!state.profileEditable}
      />
      <FormButton
        onClick={onProfileEdit}
        className={!state.profileEditable ? 'btn-form' : 'btn btn-hidden'}
        buttonText="Edit"
      />
      <FormButton
        onClick={(e) => setUserProfile(id, state.username, state.location, state.headline, state.skills, state.fbLink, state.imdbLink, state.availability, state.travel, state.union, state.bilingual, e)}
        className={!state.profileEditable ? 'btn btn-hidden' : 'btn-form'}
        buttonText="Update User Profile"
      />
    </form>
  )
}