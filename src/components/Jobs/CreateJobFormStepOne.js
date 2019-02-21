import React, { Component } from 'react'
import moment from 'moment'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import { FormDatePicker, FormDateRangePicker } from '../Forms/FormDatePicker'
import FormSelectInput from '../Forms/FormSelectInput'
import { locationObj, positionsObj, contactObj } from '../../data/formOptions'

class CreateJobFormStepOne extends Component {
  state = {
    jobObj: {
      jobID: this.props.match.params.jobID,
      jobName: '',
      jobCreator: '',
      jobCreatorID: '',
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
      jobType: 'created'
    },
    jobDescCount: 0,
    startDate: moment(),
    selectedDate: moment(),
    selectedStartDate: moment(),
    selectedEndDate: moment(),
    selectedDates: [], 
  }

  componentWillMount() {
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        jobCreator: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName,
        jobCreatorID: this.props.currentUser.id.toString()
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
    console.log('Check pressed:' +  e.target.checked)
    console.log('Checkbox id: ' + e.target.id)
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

  handleLocationSelect = (name, val) => {
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
    this.props.createReduxJob(this.state)
    this.props.history.push(`/jobs/${this.state.jobObj.jobID}/assign-users`)
  }
 
  render() {
    const { jobObj, jobDescCount, startDate, selectedDate, selectedStartDate, selectedEndDate, selectedDates } = this.state
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
              value={jobObj.jobCreator}
              placeholder={jobObj.jobCreator}
              onChange={this.handleChange}
              disabled={true}
              className="form-group--half"
            />
            <FormTextInput
              label="Job Name"
              name="jobName"
              type="text"
              value={jobObj.jobName}
              onChange={this.handleChange}
              className="form-group--half"
            />
            <FormCheckboxInput
              label="Union Required"
              checkboxId="unionMember"
              onChange={this.handleCheck}
              value={jobObj.unionMember}
              className="form-group--half"
            />
            <FormTextInput
              label={"Job Description (" + jobDescCount + "/140)"}
              name="jobDesc"
              type="text"
              value={jobObj.jobDesc}
              onChange={this.handleJobDescChange}
            />
            <div className="date-selector-type">
              <p onClick={() => this.handleDateSelectorChange('select')}>Date Selector</p>
              <p onClick={() => this.handleDateSelectorChange('range')}>Date Range Selector</p>
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
                  <p>Start Date: {this.state.selectedStartDate.format('MM/DD/YYYY')}</p>
                  <p>End Date: {this.state.selectedEndDate.format('MM/DD/YYYY')}</p>
                </div> 
              :
                <div className="date-picker">
                  <FormDatePicker
                    label="Select Job Dates"
                    startDate={startDate}
                    selectedDate={selectedDate}
                    className="date-picker-form-group"
                    handleChange={this.handleDateChange}
                  />
                  { selectedDates.length > 0 && <ul className="datesPickerList">
                    {selectedDates.map( (date, key) => {
                      return <li key={key} onClick={() => { this.removeDate(date) }}>{date}</li>
                    })}
                  </ul>}
                </div> 
            }
            <FormSelectInput
              label="Select the Job Location"
              name="jobLocation"
              options={locationObj}
              placeholder="Select Location for Job"
              isMultiSelect={false}
              onSelect={this.handleLocationSelect}
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
            />
          </form>
        </div>
        <div className="card-footer">
          <FormButton
            className="button-form"
            buttonText="Next Step"
            onClick={this.saveAndContinue}
          />
        </div>
      </div>
    )
  }
} 

export default CreateJobFormStepOne