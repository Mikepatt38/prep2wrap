import React, { Component } from 'react'
import moment from 'moment'
import dateFns from "date-fns"
import { CustomDatePicker, CustomDateRangePicker } from '../Forms/FormDatePicker'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import TrashIcon from '../../img/icon-trash.svg'
import 'react-datepicker/dist/react-datepicker.css'
const shortid = require('shortid')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export class AvailabilityForm extends Component {
  state = {
    currentSelectedDate: moment(),
    formattedDate: dateFns.format(this.props.selectedDate, 'MM/DD/YYYY'),
    reason: '',
    startDate: moment(),
    selectedDate: moment(),
    selectedDates: [], 
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

  handleDateChange = (date) => {
    this.setState(prevState => ({
      selectedDate: date,
      selectedDates: [...prevState.selectedDates, date.format('MM/DD/YYYY')]
    }))
  }

  removeDate = (dateClicked) => {
    let temp = [...this.state.selectedDates]
    let index = temp.indexOf(dateClicked)
    if (index !== -1) {
      temp.splice(index, 1);
      this.setState({selectedDates: temp})
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    let newAvailability = this.createUserDates(this.state.selectedDates)
    this.props.addMultipleDatesToAvailability(this.props.currentUser.id, this.props.currentAvailability, newAvailability)
    this.clearForm()
    this.props.close()
  }

  handleCancel(e){
    e.preventDefault()
    this.props.close()
  }

  createUserDates(dates){
    let arr = []
    dates.map(date => {
      arr.push(
        {
          id: shortid.generate(),
          date: date,
          dateTitle: `${this.state.reason}`,
          dateType: 'Personal'
        }
      )
    })
    return arr
  }


  render() {
    const { currentSelectedDate, reason } = this.state
    return (
      <div className="modal-component">
        <form 
          method="form"
          className="modal-form"
        >
          <div className="form-group">
            <div className="date-picker">
              <CustomDatePicker
                label="Click below to select dates that you wish to mark as unavailable."
                startDate={this.state.startDate}
                selectedDate={this.state.selectedDate}
                className="date-picker-form-group"
                handleChange={this.handleDateChange}
                placeholder="Click to add job dates."
                popperPlacement="top-end"
              />
              <ul className="date-picker-list">
                {this.state.selectedDates.map( (date, key) => {
                  return <span key={key} className="date-picker-list-item"><li>{date}</li><span className="date-picker-list-delete" onClick={() => { this.removeDate(date) }}><img src={TrashIcon} alt="Delete Icon" /></span></span>
                })}
              </ul> 
            </div>
          </div>
          <FormTextInput
            name="reason"
            label="Short explanation of why you are unavailable to work these days."
            onChange={this.onChange}
            type="text"
            value={reason}
          />
          <div className="button-wrapper">
            <FormButton
              className="button-primary"
              buttonText="Update Availability"
              onClick={(e) => this.handleClick(e)}
            />
          </div>
        </form>
      </div>
    )
  }
}

// <FormDatePicker
// label="Select a date"
// currentSelectedDate={currentSelectedDate}
// startDate={currentSelectedDate}
// selectedDate={currentSelectedDate}
// className="date-picker-form-group"
// handleChange={this.handleChange}
// />
