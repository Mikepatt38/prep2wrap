import React, { Component } from 'react'
import moment from 'moment'
import dateFns from "date-fns"
import { FormDatePicker } from '../Forms/FormDatePicker'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import 'react-datepicker/dist/react-datepicker.css'

export class AvailabilityForm extends Component {
  state = {
    currentSelectedDate: moment(),
    formattedDate: dateFns.format(this.props.selectedDate, 'MM/DD/YYYY'),
    reason: '',
    dates: []
  }

  handleChange = (date) => {
    this.setState({
      currentSelectedDate: date,
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
    this.props.updateUserAvailability(this.props.currentUser.id.toString(), this.props.currentAvailability, dateFns.format(this.state.currentSelectedDate, 'MM/DD/YYYY'), this.state.reason, "Requested")
    this.props.closeModal(false)
  }


  render() {
    const { currentSelectedDate, reason } = this.state
    return (
      <form 
        method="form"
        className="date-picker-form"
      >
        <FormDatePicker
          label="Select a date"
          currentSelectedDate={currentSelectedDate}
          startDate={currentSelectedDate}
          selectedDate={currentSelectedDate}
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
