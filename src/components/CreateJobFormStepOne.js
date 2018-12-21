import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormDatePicker } from './FormDatePicker'
import FormSelectInput from './FormSelectInput'
import { locationObj, positionsObj, contactObj } from '../data/formOptions'

export class CreateJobFormStepOne extends Component {

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  saveAndGoBack = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  

  render() {
    const { state } = this.props
    const { handleChange, handleCheck, handleLocationSelect, handleMultiSelect, handleDateChange, handleSelect } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <h3>Job Information</h3>
          <p>Fill out the job details to find the best users for the job.</p>
        </div>
        <div className="card-body">
          <form className="card-form-general">
            <FormTextInput
              label="Job Creator"
              name="jobCreator"
              type="text"
              value={state.jobObj.jobCreator}
              placeholder={state.jobObj.jobCreator}
              onChange={handleChange}
              disabled={true}
              className="form-group--half"
            />
            <FormTextInput
              label="Job Name"
              name="jobName"
              type="text"
              value={state.jobObj.jobName}
              onChange={handleChange}
              className="form-group--half"
            />
            <FormCheckboxInput
              label="Union Required"
              checkboxId="unionMember"
              onChange={handleCheck}
              value={state.jobObj.unionMember}
              className="form-group--half"
            />
            <FormTextInput
              label={"Job Description (" + state.jobDescCount + "/140)"}
              name="jobDesc"
              type="text"
              value={state.jobObj.jobDesc}
              onChange={handleChange}
            />
            <FormDatePicker
              label="Select Job Dates"
              startDate={state.startDate}
              selectedDate={state.selectedDate}
              className="date-picker-form-group"
              handleChange={handleDateChange}
            />
            { state.selectedDates.length > 0 && <ul className="datesPickerList">
              {state.selectedDates.map( (date, key) => {
                return <li key={key} onClick={() => { this.props.removeDate(date) }}>{date}</li>
              })}
            </ul>}
            <FormSelectInput
              label="Select the Job Location"
              name="jobLocation"
              options={locationObj}
              placeholder="Select Location for Job"
              isMultiSelect={false}
              onSelect={handleLocationSelect}
              className="form-group--half"
            />
            <FormSelectInput
              label="Preferred Form of Contact"
              name="jobContact"
              options={contactObj}
              placeholder="Select Best Form of Contact"
              isMultiSelect={false}
              onSelect={handleSelect}
              className="form-group--half"
            />
            <FormSelectInput
              label="Select Job Positions Hiring For"
              name="jobPositions"
              options={positionsObj}
              placeholder="Select Positions For Jobs"
              isMultiSelect={true}
              onSelect={handleMultiSelect}
            />
            <FormButton
              className="button-form"
              buttonText="Prev Step"
              onClick={this.saveAndGoBack}
            />
            <FormButton
              className="button-form"
              buttonText="Invite Users"
              onClick={this.saveAndContinue}
            />
          </form>
        </div>
      </div>
    )
  }
} 