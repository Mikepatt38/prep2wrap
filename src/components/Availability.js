import React, { Component } from 'react'
import moment from 'moment'
import { FormDatePicker } from '../components/FormDatePicker'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import 'react-datepicker/dist/react-datepicker.css'

export class AvailabilityForm extends Component {
  state = {
    startDate: moment(),
    formattedDate: moment(),
    reason: ''
  }

  handleChange = (date) => {
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

  render() {
    const { currentUser, setAvailabilityDate } = this.props
    return (
      <form 
        method="form"
        className="date-picker-form"
      >
        <FormDatePicker
          label="Select a date"
          startDate={this.state.startDate}
          className="date-picker-form-group"
          handleChange={this.handleChange}
        />
        <FormTextInput
          name="reason"
          label="Reason"
          onChange={this.onChange}
          type="text"
          value={this.state.reason}
        />
        <FormButton
          className="btn-form"
          buttonText="Block Out Date"
          onClick={(e) => setAvailabilityDate(currentUser.id, this.state.formattedDate, this.state.reason, e)}
        />
      </form>
    ) 
  }
}