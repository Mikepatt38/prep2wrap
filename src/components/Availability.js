import React, { Component } from 'react'
import { FormDatePicker } from '../components/FormDatePicker'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import 'react-datepicker/dist/react-datepicker.css'

export const AvailabilityForm = ({ state, currentUser, setAvailabilityDate, fetching, userDates, handleChange, onChange }) => {
  return ( 
    fetching ? <h1>Loading...</h1> :
    <React.Fragment>
      <form 
        method="form"
        className="date-picker-form"
      >
        <FormDatePicker
          label="Select a date"
          startDate={state.startDate}
          className="date-picker-form-group"
          handleChange={handleChange}
        />
        <FormTextInput
          name="reason"
          label="Reason"
          onChange={onChange}
          type="text"
          value={state.reason}
        />
        <FormButton
          className="btn-form"
          buttonText="Block Out Date"
          onClick={(e) => setAvailabilityDate(currentUser.id, state.formattedDate, state.reason, e)}
        />
      </form>
      { userDates.map((date, key) => {
        return <p key={key}>{date.date}</p>
      })}
    </React.Fragment>
  ) 
}