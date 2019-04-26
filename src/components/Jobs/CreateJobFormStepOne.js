import React, { Component } from 'react'
import moment from 'moment'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import { FormDatePicker, FormDateRangePicker } from '../Forms/FormDatePicker'
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
        jobContactEmail: this.props.currentUser.email
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
        }
      }))
    })
  }

  handleChange = e => {
    const newVal = e.target.value
    const name = e.target.name

    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      }
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
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      }
    }))
  }

  handleSelectValues = (name, val) => {
    const newVal = val
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      }
    }))
  }

  handleMultiSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        [name]: tempArr
      }
    }))
  }

  handleDateChange = (date) => {
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          jobDates: [...prevState.jobObj.jobDates, date.format('MM/DD/YYYY')]
      },
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

  saveAndContinue = () => {
    console.log(this.validateForm())
    // this.validateForm &&
    //   this.props.createReduxJob(this.state)
    //   this.props.history.push(`/jobs/${this.state.jobObj.jobID}/assign-users`)
  }

  validateForm = () => {
    const { jobName, jobDesc, jobDates, jobLocation, jobPositions, jobType } = this.state.jobObj
    const inputs = [ ['jobName', jobName], ['jobDesc', jobDesc], ['jobDates', jobDates], ['jobLocation', jobLocation], ['jobPositions', jobPositions], ['jobType', jobType] ]
    let validated = true
    inputs.map( input => {
      if( input[1].length == 0 ){
        const inputName = `${input[0]}Error`
        this.setState({ [inputName]: true })
        console.log(inputName)
        validated = false
      }
    })
    return validated
  }
 
  render() {
    const { jobObj, jobDescCount, startDate, selectedDate, selectedStartDate, selectedEndDate, selectedDates } = this.state
    return (
      <div className="app-page">
        <div className="app-page-title">
          <h1>Create Job</h1>
        </div>
        <div className="app-page-section">
          <div className="create-job-wrapper">
            <div className="create-job-wrapper-main">
              <div className="card card-create-job no-hover">
                <h3>Basic Information</h3>
                <div className="card-body">
                  <form className="card-form card-form-job-1">
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
                  </form>
                </div>
              </div>
              <div className="card card-create-job no-hover">
                <h3>Job Specifics</h3>
                <div className="card-body">
                  <form className="card-form card-form-job-1">
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
                    </form>
                  </div>
                </div>
              </div>
              <div className="create-job-wrapper-sidebar">
                <div className="card card-create-job no-hover">
                  <h3>Job Dates</h3>
                  <div className="card-body">
                    <form className="card-form card-form-job-1">
                      <div className="form-group">
                        <div className="date-selector-type">
                          <FormCheckboxInput
                            checkboxId="dateSelector"
                            onChange={() => this.setState(prevState => ({ jobObj: { ...prevState.jobObj, dateSelectorRangeActive: false } }))}
                            value={!jobObj.dateSelectorRangeActive}
                            customText="Date Picker"
                            className="form-group--half"
                          />
                          <FormCheckboxInput
                            checkboxId="dateRangeSelector"
                            onChange={() => this.setState(prevState => ({ jobObj: { ...prevState.jobObj, dateSelectorRangeActive: true } }))}
                            value={jobObj.dateSelectorRangeActive}
                            customText="Range Selector"
                            className="form-group--half"
                          />
                        </div>
                        {
                          jobObj.dateSelectorRangeActive 
                          ?
                            <div className="date-picker--range">
                              <FormDateRangePicker
                                label="Select Job Dates Range"
                                startDate={startDate}
                                selectedStartDate={selectedStartDate}
                                selectedEndDate={selectedEndDate}
                                className="date-picker-form-group"
                                handleDateChangeStart={this.handleDateChangeStart}
                                handleDateChangeEnd={this.handleDateChangeEnd}
                              />
                              <div className="date-picker--range-dates">
                                <label>Start Date:</label><span className="date-pill">{this.state.selectedStartDate.format('MM/DD/YYYY')}</span>
                                <label className="label-bottom">End Date:</label><span className="date-pill">{this.state.selectedEndDate.format('MM/DD/YYYY')}</span>
                              </div>
                            </div> 
                          :
                            <div className="date-picker">
                              <FormDatePicker
                                label="Select Job Dates"
                                startDate={startDate}
                                selectedDate={selectedDate}
                                className="date-picker-form-group"
                                handleChange={this.handleDateChange}
                                placeholderText="Click to add job dates."
                                error={this.state.jobDatesError}
                                errorMsg="Please choose job dates."
                              />
                                <label>Selected Job Dates:</label>
                                <ul className="date-picker-list">
                                  {selectedDates.map( (date, key) => {
                                    return <span key={key} className="date-picker-list-item"><li>{date}</li><span className="date-picker-list-delete" onClick={() => { this.removeDate(date) }}><img src={TrashIcon} alt="Delete Icon" /></span></span>
                                  })}
                                </ul>
                            </div> 
                          }
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
          <div className="job-form-navigation">
            <div className="buttons-left">
              <FormButton
                className="button-danger"
                buttonText="Cancel"
                // onClick={this.saveAndContinue}
              />
            </div>
            <div className="buttons-right">
              <FormButton
                className="button-secondary"
                buttonText="Prev Step"
                disabled="true"
                // onClick={this.saveAndContinue}
              />
              <FormButton
                className="button-primary"
                buttonText="Next Step"
                onClick={this.saveAndContinue}
              />
            </div>
          </div>
        </div>
      )
    }
  } 

export default CreateJobFormStepOne

// <div className="card card-create-job no-hover">
// <h3>Job Dates</h3>
// <div className="card-body">
//   <div className="form-group">
//     <div className="date-selector-type">
//       <p onClick={() => this.handleDateSelectorChange('select')}>Date Selector</p>
//       <p onClick={() => this.handleDateSelectorChange('range')}>Date Range Selector</p>
//     </div>
//     {
//       jobObj.dateSelectorRangeActive 
//       ?
//         <div className="date-picker--range">
//           <FormDateRangePicker
//             label="Select Job Dates Range"
//             startDate={startDate}
//             selectedStartDate={selectedStartDate}
//             selectedEndDate={selectedEndDate}
//             className="date-picker-form-group"
//             handleDateChangeStart={this.handleDateChangeStart}
//             handleDateChangeEnd={this.handleDateChangeEnd}
//           />
//           <p>Start Date: {this.state.selectedStartDate.format('MM/DD/YYYY')}</p>
//           <p>End Date: {this.state.selectedEndDate.format('MM/DD/YYYY')}</p>
//         </div> 
//       :
//         <div className="date-picker">
//           <FormDatePicker
//             label="Select Job Dates"
//             startDate={startDate}
//             selectedDate={selectedDate}
//             className="date-picker-form-group"
//             handleChange={this.handleDateChange}
//           />
//           { selectedDates.length > 0 && <ul className="datesPickerList">
//             {selectedDates.map( (date, key) => {
//               return <li key={key} onClick={() => { this.removeDate(date) }}>{date}</li>
//             })}
//           </ul>}
//         </div> 
//     }
//   </div>
// </div>
// </div>
// <div className="card card-create-job no-hover">
// <h3>Job Positions</h3>
// <div className="card-body">
//   <FormSelectInput
//     label="Select Job Positions Hiring For"
//     name="jobPositions"
//     options={positionsObj}
//     placeholder="Select Positions For Jobs"
//     isMultiSelect={true}
//     onSelect={this.handleMultiSelect}
//   />
// </div>
// </div>
// </div>
// <div className="card no-hover">
// <div className="card-body">
// <form className="card-form card-form-job-1">

//   <FormSelectInput
//     label="Preferred Form of Contact"
//     name="jobContact"
//     options={contactObj}
//     placeholder="Select Best Form of Contact"
//     isMultiSelect={false}
//     onSelect={this.handleSelect}
//     className="form-group--half"
//   />
//   <FormCheckboxInput
//     label="Union Required"
//     checkboxId="unionMember"
//     onChange={this.handleCheck}
//     value={jobObj.unionMember}
//     className="form-group--half"
//   />
//   <div className="button-wrapper">
//     <FormButton
//       className="button-primary"
//       buttonText="Next Step"
//       onClick={this.saveAndContinue}
//     />
//   </div>
// </form>
// </div>
// </div>