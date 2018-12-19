import React, { Component } from 'react'
import moment from 'moment'
import dateFns from "date-fns"
import { FormDatePicker } from './FormDatePicker'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import 'react-datepicker/dist/react-datepicker.css'

export class AvailabilityForm extends Component {
  state = {
    startDate: moment(),
    formattedDate: dateFns.format(this.props.selectedDate, 'MM/DD/YYYY'),
    reason: '',
    dates: []
  }

  handleChange = (date) => {
    console.log('Changing...')
    this.setState({
      startDate: date,
      formattedDate: date.format('MM/DD/YYYY')
    })
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.setAvailabilityDate(this.props.currentUser.id, this.state.formattedDate, this.state.reason)
    this.props.closeModal(false)
  }


  render() {
    const { startDate, reason } = this.state
    return (
      <form 
        method="form"
        className="date-picker-form"
      >
        <FormDatePicker
          label="Select a date"
          startDate={startDate}
          selectedDate={this.props.selectedDate}
          className="date-picker-form-group"
          handleChange={this.handleChange}
        />
        <FormTextInput
          name="reason"
          label="Reason"
          onChange={this.onChange}
          type="text"
          value={reason}
        />
        <FormButton
          className="button-primary"
          buttonText="Block Out Date"
          onClick={(e) => this.handleClick(e)}
        />
      </form>
    )
  }
}