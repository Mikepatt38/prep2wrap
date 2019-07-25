import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import { FormDatePicker, FormDateRangePicker, CustomDatePicker, CustomDateRangePicker } from '../Forms/FormDatePicker'
import FormSelectInput from '../Forms/FormSelectInput'
import { locationObj, positionsObj, contactObj, jobTypesObj } from '../../data/formOptions'
import TrashIcon from '../../img/icon-trash.svg'

class CreateJobFormStepOne extends Component {
  state = {
    jobObj: {
      jobID: this.props.match.params.jobID,
      jobName: '',
      jobCreator: '',
      jobCreatorID: '',
      jobContactEmail: '',
      jobCreatorNumber: '',
      unionMember: false,
      jobDesc: '',
      jobDates: [],
      jobDatesRange: [],
      jobCreatedTime: moment(),
      jobPositions: [],
      jobLocation: [],
      jobContact: [],
      usersAssigned: [],
      dateSelectorRangeActive: false,
      jobStatus: 'created',
      jobType: ''
    },
    jobDescCount: 0,
    startDate: moment(),
    selectedDate: moment(),
    selectedStartDate: moment(),
    selectedEndDate: moment(),
    selectedDates: [], 
    jobNameError: false,
    jobDescError: false,
    jobDatesError: false,
    jobPositionsError: false,
    jobLocationError: false,
    jobTypeError: false,
  }

  componentDidMount() {
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        jobCreator: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName,
        jobCreatorID: this.props.currentUser.id.toString(),
        jobContactEmail: this.props.currentUser.email,
        jobCreatorNumber: this.props.currentUser.mobileNumber
      }
    }))
  }

  handleJobDescChange = e => {
    const newVal = e.target.value
    const name = e.target.name
    
    this.setState({
      jobDescCount: newVal.length <= 140 ? newVal.length : 140
    }, () => {
      this.setState(prevState => ({
        jobObj: {
          ...prevState.jobObj,
          [name]: this.state.jobDescCount < 140 ? newVal : this.state.jobObj.jobDesc
        },
        jobDescError: false
      }))
    })
  }

  handleChange = e => {
    const newVal = e.target.value
    const name = e.target.name
    const errorName = `${name}Error`

    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal,
      },
      [errorName]: false 
    }))
  }

  handleCheck = e => {
    const newVal = e.target.checked
    const name = e.target.id
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      }
    }))
  }

  handleSelect = (name, val) => {
    const newVal = val.value
    const errorName = `${name}Error`
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      },
      [errorName]: false
    }))
  }

  handleSelectValues = (name, val) => {
    const newVal = val
    const errorName = `${name}Error`
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      },
      [errorName]: false
    }))
  }

  handleMultiSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    const errorName = `${name}Error`
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        [name]: tempArr
      },
      errorName: false
    }))
  }

  handleDateChange = (date) => {
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          jobDates: [...prevState.jobObj.jobDates, date.format('MM/DD/YYYY')]
      },
      jobDatesError: false,
      selectedDate: date,
      selectedDates: [...prevState.selectedDates, date.format('MM/DD/YYYY')]
    }))
  }

  handleDateChangeStart = (date) => {
    console.log('Changing the start date')
    let tempArr = this.state.jobObj.jobDatesRange
    tempArr[0] = date.format('MM/DD/YYYY')
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          jobDatesRange: tempArr,
          jobDates: tempArr
      },
      selectedStartDate: date,
      selectedEndDate: this.state.selectedEndDate.format('MM/DD/YYYY') === moment().format('MM/DD/YYYY') ? date : this.state.selectedEndDate
    })) 
  }

  handleDateChangeEnd = (date) => {
    let tempArr = this.state.jobObj.jobDatesRange
    tempArr[1] = date.format('MM/DD/YYYY')
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          jobDatesRange: tempArr,
          jobDates: tempArr
      },
      selectedEndDate: date,
    })) 
  }

  handleDateSelectorChange = (selectorType) => {
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          dateSelectorRangeActive: selectorType === 'range' ? true : false
      },
    })) 
  }

  removeDate = (dateClicked) => {
    let temp = [...this.state.selectedDates]
    let index = temp.indexOf(dateClicked)
    if (index !== -1) {
      temp.splice(index, 1);
      this.setState({selectedDates: temp}, () => { console.log('Removed Date: ' + dateClicked)})
    }
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.validateForm() && 
      this.props.createReduxJob(this.state) &&
      this.props.history.push(`/jobs/${this.state.jobObj.jobID}/assign-users`)
  }

  cancelJobCreation(e){
    e.preventDefault()
    this.props.history.push('/jobs')
  }

  validateForm = () => {
    const { jobName, jobDesc, jobDates, jobLocation, jobPositions, jobType } = this.state.jobObj
    const inputs = [ ['jobName', jobName], ['jobDesc', jobDesc], ['jobDates', jobDates], ['jobLocation', jobLocation], ['jobPositions', jobPositions], ['jobType', jobType] ]
    let validated = true
    inputs.map( input => {
      if( input[1].length == 0 ){
        const inputName = `${input[0]}Error`
        this.setState({ [inputName]: true })
        validated = false
      }
    })
    return validated
  }
 
  render() {
    const { jobObj, jobDescCount, startDate, selectedDate, selectedStartDate, selectedEndDate, selectedDates } = this.state
    return (
      <div className="app-page">
        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="link">Dashboard</Link>
              <Link to="/jobs" className="active">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/availability" className="link">Availability</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
            <Link className="button button-workspace" to={{
              pathname: `/jobs/${this.state.jobID}/job-information`,
              query: `${this.state.jobID}`
            }}>Create New Job</Link>
          </div> 
        </div>

        <div className="app-page-body">
          <div className="app-page-section">

            <div className="card">
              <div className="card-body">
                <p>Set up your job by providing the job details and positions so we can select users that match your criteria for you to hire.</p>
                <form className="create-job-form">
                  <FormTextInput
                    label="Job Creator"
                    name="jobCreator"
                    type="text"
                    value={jobObj.jobCreator}
                    placeholder={jobObj.jobCreator}
                    onChange={() => {}}
                    disabled={true}
                    className="form-group--half"
                  />
                  <FormSelectInput
                    label="Job Location"
                    name="jobLocation"
                    options={locationObj}
                    placeholder="Select Location for Job"
                    isMultiSelect={false}
                    onSelect={this.handleSelectValues}
                    className="form-group--half"
                    error={this.state.jobLocationError}
                    errorMsg="Please select a job location."
                  />
                  <FormTextInput
                    label="Job Name"
                    name="jobName"
                    type="text"
                    value={jobObj.jobName}
                    onChange={this.handleChange}
                    className="form-group--half"
                    error={this.state.jobNameError}
                    errorMsg="Please add a valid job name."
                  />
                  <FormSelectInput
                    label="Select the Job Type"
                    name="jobType"
                    options={jobTypesObj}
                    placeholder="Select Type of Job"
                    isMultiSelect={false}
                    onSelect={this.handleSelectValues}
                    className="form-group--half"
                    error={this.state.jobTypeError}
                    errorMsg="Please select a job type."
                  />
                  <div className={this.state.jobDescError ? 'field-error form-group' : 'form-group'}>
                    <label>{"Job Description (" + jobDescCount + "/140)"}:</label>
                    <textarea 
                      name="jobDesc"
                      type="text"
                      value={jobObj.jobDesc}
                      onChange={this.handleJobDescChange}
                      className="textarea"
                    ></textarea>  
                    <p className="error-msg">Please add a valid job description.</p>
                  </div>

                  <hr />
                  <p>These are job specifics that help us find the right crew members for you to consider hiring</p>
                  <FormCheckboxInput
                    label="Union Required"
                    checkboxId="unionMember"
                    onChange={this.handleCheck}
                    value={jobObj.unionMember}
                    className="form-group--half"
                  />
                  <FormSelectInput
                    label="Preferred Form of Contact"
                    name="jobContact"
                    options={contactObj}
                    placeholder="Select Best Form of Contact"
                    isMultiSelect={false}
                    onSelect={this.handleSelect}
                    className="form-group--half"
                  />
                  <FormSelectInput
                    label="Select Job Positions Hiring For"
                    name="jobPositions"
                    options={positionsObj}
                    placeholder="Select Positions For Jobs"
                    isMultiSelect={true}
                    onSelect={this.handleMultiSelect}
                    error={this.state.jobPositionsError}
                    errorMsg="Please select job positions to hire for."
                  />

                  <hr />
                  <p>Select all dates that the job will be active during.</p>
                  <div className="form-group">
                    <div className="date-picker">
                      <CustomDatePicker
                        label="Select All Job Dates"
                        startDate={startDate}
                        selectedDate={selectedDate}
                        className="date-picker-form-group"
                        handleChange={this.handleDateChange}
                        placeholder="Click to add job dates."
                        error={this.state.jobDatesError}
                        errorMsg="Please choose job dates."
                      />
                      <ul className="date-picker-list">
                        {selectedDates.map( (date, key) => {
                          return <span key={key} className="date-picker-list-item"><li>{date}</li><span className="date-picker-list-delete" onClick={() => { this.removeDate(date) }}><img src={TrashIcon} alt="Delete Icon" /></span></span>
                        })}
                      </ul> 
                    </div>
                  </div>
                  <div className="button-wrapper">
                    <FormButton
                      className="button-quit"
                      buttonText="Cancel"
                      onClick={(e) => this.cancelJobCreation(e)}
                    />
                    <FormButton
                      className="button-primary"
                      buttonText="Next Step"
                      onClick={(e) => this.saveAndContinue(e)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

export default CreateJobFormStepOne

// <div className="date-selector-type">
// <FormCheckboxInput
//   checkboxId="dateSelector"
//   onChange={() => this.setState(prevState => ({ jobObj: { ...prevState.jobObj, dateSelectorRangeActive: false } }))}
//   value={!jobObj.dateSelectorRangeActive}
//   customText="Date Picker"
//   className="form-group--half"
// />
// <FormCheckboxInput
//   checkboxId="dateRangeSelector"
//   onChange={() => this.setState(prevState => ({ jobObj: { ...prevState.jobObj, dateSelectorRangeActive: true } }))}
//   value={jobObj.dateSelectorRangeActive}
//   customText="Range Selector"
//   className="form-group--half"
// />
// </div>

// <div className="date-picker">
// <CustomDateRangePicker
//   label="Select Job Dates Range"
//   startDate={startDate}
//   selectedStartDate={selectedStartDate}
//   selectedEndDate={selectedEndDate}
//   className="date-picker-form-group"
//   placeholder="Select Job Start Date"
//   placeholderEnd="Select Job End Date"
//   handleDateChangeStart={this.handleDateChangeStart}
//   handleDateChangeEnd={this.handleDateChangeEnd}
// />
// </div>
// :

