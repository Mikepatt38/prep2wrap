import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export class DatePickerButton extends Component {
  render(){
    return(
      <button
        type="button"
        className="example-date-picker-button"
        onClick={this.props.onClick}
        placeholder={this.props.placeholder}>
        {this.props.value}
      </button>
    )
  }
}

export function CustomDatePicker(props){
  return (
    <div className={props.error ? `field-error form-group ${props.className}` : `form-group ${props.className}` }>
      <div className="date-select-input">
        <label className="date-picker-label">{props.label}</label>
        <DatePicker
          customInput={<DatePickerButton />}
          selected={props.selectedDate}
          onChange={props.handleChange} 
          placeholderText={props.placeholder}
          shouldCloseOnSelect={false}
          allowSameDay={true}
          minDate={moment()}
          popperPlacement={props.popperPlacement ? props.popperPlacement : 'bottom-start'}
        />
      </div>
      <p className="error-msg">{props.errorMsg}</p>
    </div>
  )
}

export function CustomDateRangePicker(props){
  return (
    <div className={`form-group ${props.className}`}>
      <div className="date-range-input">
        <label className="date-picker-label">Click to Select Start Date</label>
        <DatePicker
          customInput={<DatePickerButton customName="Click to Select Job Start Date" />}
          selected={moment(props.selectedStartDate.toISOString())}
          selectsStart
          startDate={props.selectedStartDate}
          endDate={props.selectedEndDate}
          onChange={props.handleDateChangeStart}
          placeholder={props.startPlaceholderText}
        /> 
      </div>
      <div className="date-range-input">
        <label className="date-picker-label">Click to Select End Date</label>
        <DatePicker
          selected={moment(props.selectedEndDate.toISOString())}
          selectsEnd
          customInput={<DatePickerButton customName="Click to Select Job End Date" />}
          startDate={props.selectedStartDate}
          endDate={props.selectedEndDate}
          onChange={props.handleDateChangeEnd}
          placeholderEnd={props.endPlaceholderText}
        /> 
      </div>
    </div>
  )
}
