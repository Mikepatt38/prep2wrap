import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export const FormDatePicker = ( {label, handleChange, className, selectedDate, placeholderText} ) => {
  return (
    <div className={'form-group' + ` ${className}`}>
      <label className="date-picker-label">{label}</label>
      <DatePicker
        inline
        onChange={handleChange}
        placeholderText={placeholderText}
      />
    </div>
  )
} 

export const FormDateRangePicker = ( {label, handleDateChangeStart, handleDateChangeEnd, className, selectedStartDate, selectedEndDate, startPlaceholderText, endPlaceholderText} ) => {
  return (
    <div className={'form-group' + ` ${className}`}>
      <label className="date-picker-label">{label}</label>
      <DatePicker
        inline
        selected={moment(selectedStartDate.toISOString())}
        selectsStart
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onChange={handleDateChangeStart}
        placeholderText={startPlaceholderText}
      />

      <DatePicker
        selected={moment(selectedEndDate.toISOString())}
        selectsEnd
        inline
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onChange={handleDateChangeEnd}
        placeholderText={endPlaceholderText}
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

//       
// <DatePicker
// selected={moment(selectedEndDate.toISOString())}
// selectsEnd
// startDate={selectedStartDate}
// endDate={selectedEndDate}
// onChange={handleDateChangeEnd}
// placeholderText={endPlaceholderText}
// />