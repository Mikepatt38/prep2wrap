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
  }

  clearForm = () => {
    this.setState({
      currentSelectedDate: moment(),
      formattedDate: moment(),
      reason: '',
    })
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
    this.clearForm()
    this.props.close()
  }

  handleCancel(e){
    e.preventDefault()
    this.props.close()
  }


  render() {
    const { currentSelectedDate, reason } = this.state
    return (
      <div className="modal-component">
        <form 
          method="form"
          className="modal-form"
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
          <div className="button-wrapper">
            <FormButton
              className="button-transparent"
              buttonText="Cancel"
              onClick={(e) => this.handleCancel(e)}
            />
            <FormButton
              className="button-primary"
              buttonText="Block Out Date"
              onClick={(e) => this.handleClick(e)}
            />
          </div>
        </form>
      </div>
    )
  }
}
