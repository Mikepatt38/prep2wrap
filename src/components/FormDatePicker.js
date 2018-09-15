import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export const FormDatePicker = ( {label, startDate, handleChange, className, selectedDate} ) => {
  console.log(selectedDate)
  return (
    <div className={'form-group' + ` ${className}`}>
      <label className="date-picker-label">{label}</label>
      <DatePicker
        selected={moment(selectedDate.toISOString())}
        onChange={handleChange}
      />
    </div>
  )
}

FormDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  className: PropTypes.string,
  handleChange: PropTypes.func,
}