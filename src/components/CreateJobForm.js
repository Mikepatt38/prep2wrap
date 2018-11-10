import React, { Component } from 'react'
import moment from 'moment'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormDatePicker } from './FormDatePicker'
import FormSelectInput from './FormSelectInput'
import JobResultsTable from './JobResultsTable'

export class CreateJobForm extends Component {
  state = {
    jobObj: {
      jobName: '',
      jobCreator: '',
      unionMember: false,
      jobDesc: '',
      jobDates: [],
      jobCreatedTime: new Date(),
      jobPositions: [],
      jobLocation: [],
      jobContact: []
    },
    step: 1,
    startDate: moment(),
    formattedDate: moment(),
    selectedDate: moment(),
  }

  componentWillMount() {
    this.setState(prevState => ({
      jobObj: {
        ...prevState.jobObj,
        jobCreator: this.props.currentUser.firstName + ' ' + this.props.currentUser.lastName
      }
    }))
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
        step : step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
        step : step - 1
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
    const newVal = val
    this.setState(prevState => ({
      jobObj: {
          ...prevState.jobObj,
          [name]: newVal
      }
    }))
  }

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
      formattedDate: date.format('MM/DD/YYYY')
    })
  }

  render(){
    switch(this.state.step) {
      case 1:
        return <CreateJobFormStep1
                state={this.state}
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                handleCheck={this.handleCheck}
                handleSelect={this.handleSelect}
                handleDateChange={this.handleDateChange}
              />
      case 2:
        return <CreateJobFormStep2 
                state={this.state} 
                nextStep={this.nextStep}
                prevState={this.prevStep} 
                userResultsForJobCreation={this.props.userResultsForJobCreation}
                setUserModal={this.props.setUserModal}
                userModalActive={this.props.userModalActive}
                createJob={this.props.createJob}
                currentUser={this.props.currentUser}
               />
      case 3:
        return <h1>Job Created.</h1>
    }
  
  }
}

export class CreateJobFormStep1 extends Component {

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const { state } = this.props
    const { handleChange, handleCheck, handleDateChange, handleSelect } = this.props
    return (
      <form>
        <FormTextInput
          label="Job Creator"
          name="jobCreator"
          type="text"
          value={state.jobObj.jobCreator}
          placeholder={state.jobObj.jobCreator}
          onChange={handleChange}
          disabled={true}
        />
        <FormTextInput
          label="Job Name"
          name="jobName"
          type="text"
          value={state.jobObj.jobName}
          onChange={handleChange}
        />
        <FormCheckboxInput
          label="Union Required"
          checkboxId="unionMember"
          onChange={handleCheck}
          value={state.jobObj.unionMember}
        />
        <FormTextInput
          label="Job Description"
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
        <FormSelectInput
          label="Select Job Positions Hiring For"
          name="jobPositions"
          options={positionsObj}
          placeholder="Select Positions For Jobs"
          isMultiSelect={true}
          onSelect={handleSelect}
        />
        <FormSelectInput
          label="Preferred Form of Contact"
          name="jobContact"
          options={contactObj}
          placeholder="Select Best Form of Contact"
          isMultiSelect={true}
          onSelect={handleSelect}
        />
        <FormButton
          className="button-primary"
          buttonText="Invite Users"
          onClick={this.saveAndContinue}
        />
      </form>
    )
  }
}

class CreateJobFormStep2 extends Component {

  state = {
    currentPositionsInvited: [],
    usersMatchedResults: [],
    loading: true,
    usersAssigned: [[]]
  }

  componentWillMount() {
    this.props.userResultsForJobCreation(this.props.state.jobObj)
      .then( (results) => {
        this.setState({
          usersMatchedResults: results,
          loading: false
        })
      })
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.createJob(this.props.currentUser.id.toString(), 'Job Name Here')
    this.props.nextStep()
  }

  assignPosition = (usersAssignedArr) => {
    console.log(usersAssignedArr)
    this.setState({
      usersAssigned: usersAssignedArr
    })
  }

  render() {
    const { state } = this.props
    return (
      !this.state.loading && this.state.usersMatchedResults.length > 0 &&  
      <React.Fragment>
        <JobResultsTable
          results={this.state.usersMatchedResults}
          setUserModal={this.props.setUserModal}
          userModalActive={this.props.userModalActive}
          positions={state.jobObj.jobPositions}
          assignPosition={this.assignPosition}
        />
        <FormButton
          className="button-primary"
          buttonText="Send Invite and Create Job"
          onClick={this.saveAndContinue}
        />
      </React.Fragment>
    )
  }
}

const locationObj = [
  { value: 'New York, NY', label: 'New York, NY' },
  { value: 'Wilmington, NC', label: 'Wilmington, NC' },
  { value: 'Shreveport, LA', label: 'Shreveport, LA' },
  { value: 'New Orleans, LA', label: 'New Orleans, LA' },
  { value: 'Atlanta, GA', label: 'Atlanta, GA' },
  { value: 'Albuquerque, NM', label: 'Albuquerque, NM' },
  { value: 'Santa Fe, NM', label: 'Santa Fe, NM' },
  { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
  { value: 'Detroit, MI', label: 'Detroit, MI' },
  { value: 'Portland, OR', label: 'Portland, OR' },
  { value: 'Las Vegas, NV', label: 'Las Vegas, NV' },
  { value: 'Austin, TX', label: 'Austin, TX' },
  { value: 'Dallas, TX', label: 'Dallas, TX' },
  { value: 'Pittsburgh, PA', label: 'Pittsburgh, PA' },
  { value: 'Boston, MA', label: 'Boston, MA' },
  { value: 'Oahu, HI', label: 'Oahu, HI' },
  { value: 'Chicago, IL', label: 'Chicago, IL' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'Miami, FL', label: 'Miami, FL' },
  { value: 'Savannah, GA', label: 'Savannah, GA' },
  { value: 'Seattle, WA', label: 'Seattle, WA' }
]

const positionsObj = [
  { value: 'Production Assistant', label: 'Production Assistant' },
  { value: 'Shopper', label: 'Shopper' },
  { value: 'Set Costumer', label: 'Set Costumer' },
  { value: 'Costumer', label: 'Costumer' },
  { value: 'Key Costumer', label: 'Key Costumer' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'Assistant Costume Designer', label: 'Assistant Costume Designer' },
  { value: 'Costume Designer', label: 'Costume Designer' },
  { value: 'Truck Costumer', label: 'Truck Costumer' },
  { value: 'Cutter/ Fitter', label: 'Cutter/ Fitter' },
  { value: 'Coordinator', label: 'Coordinator' },
  { value: 'Tailor', label: 'Tailor' },
  { value: 'Ager/ Dryer', label: 'Ager/ Dryer' },
  { value: 'Illustrator/ Concept Artist', label: 'Illustrator/ Concept Artist' }
]

const contactObj = [
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
]