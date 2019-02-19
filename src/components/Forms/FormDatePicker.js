import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export const FormDatePicker = ( {label, startDate, handleChange, className, selectedDate} ) => {
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

export const FormDateRangePicker = ( {label, handleDateChangeStart, handleDateChangeEnd, className, selectedStartDate, selectedEndDate} ) => {
  return (
    <div className={'form-group' + ` ${className}`}>
      <label className="date-picker-label">{label}</label>
      <DatePicker
        selected={moment(selectedStartDate.toISOString())}
        selectsStart
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onChange={handleDateChangeStart}
      />
      
      <DatePicker
        selected={moment(selectedEndDate.toISOString())}
        selectsEnd
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onChange={handleDateChangeEnd}
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