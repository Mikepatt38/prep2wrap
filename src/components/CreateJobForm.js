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
      jobCreatedTime: moment(),
      jobPositions: [],
      jobLocation: [],
      jobContact: []
    },
    jobDescCount: 0,
    step: 1,
    startDate: moment(),
    formattedDate: moment(),
    selectedDate: moment(),
    selectedDates: [],
    usersAssigned: []
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

  errorStep = () => {
    const { step } = this.state
    this.setState({
      step: 'error'
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
    }), () => {
      name === 'jobDesc' 
      ? 
        this.setState({
          jobDescCount: this.state.jobObj.jobDesc.length 
        })
      : null
    })

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

  removeDate = (dateClicked) => {
    let temp = [...this.state.selectedDates]
    let index = temp.indexOf(dateClicked)
    if (index !== -1) {
      temp.splice(index, 1);
      this.setState({selectedDates: temp}, () => { console.log('Removed Date: ' + dateClicked)})
    }
  }

  assignedUsers = (assignedUsers) => {
    this.setState({
      usersAssigned: assignedUsers
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
                handleMultiSelect={this.handleMultiSelect}
                handleDateChange={this.handleDateChange}
                setJobObjData={this.props.setJobObjData}
                removeDate={this.removeDate}
              />
      case 2:
        return <CreateJobFormStep2 
                state={this.state} 
                nextStep={this.nextStep}
                prevState={this.prevStep} 
                userResultsForJobCreation={this.props.userResultsForJobCreation}
                setUserModal={this.props.setUserModal}
                userModalActive={this.props.userModalActive}
                assignedUsers={this.assignedUsers}
               />
      case 3:
        return <CreateJobFormStep3
                state={this.state}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                currentUser={this.props.currentUser}
                createJob={this.props.createJob}
              />
      case 4: 
        return <div>
                <p>Success! Your job invites have been sent.</p>
              </div>
      case 'error':
        return <div>
                <p>Oops! Something went wrong, try recreating your job to fix the error!</p>
              </div>
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
    const { handleChange, handleCheck, handleMultiSelect, handleDateChange, handleSelect } = this.props
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
        <ul>
          {state.selectedDates.map( date => {
            return <li onClick={() => { this.props.removeDate(date) }}>{date}</li>
          })}
        </ul>
        <FormSelectInput
          label="Select the Job Location"
          name="jobLocation"
          options={locationObj}
          placeholder="Select Location for Job"
          isMultiSelect={false}
          onSelect={handleSelect}
        />
        <FormSelectInput
          label="Select Job Positions Hiring For"
          name="jobPositions"
          options={positionsObj}
          placeholder="Select Positions For Jobs"
          isMultiSelect={true}
          onSelect={handleMultiSelect}
        />
        <FormSelectInput
          label="Preferred Form of Contact"
          name="jobContact"
          options={contactObj}
          placeholder="Select Best Form of Contact"
          isMultiSelect={false}
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
    this.props.nextStep()
  }

  assignPosition = (usersAssignedArr) => {
    this.setState({
      usersAssigned: usersAssignedArr
    }, 
    () => {
      this.props.assignedUsers(this.state.usersAssigned)
    })
  }

  render() {
    const { state } = this.props
    console.log(this.props.state)
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

class CreateJobFormStep3 extends Component {
  
  saveAndContinue = (e) => {
    this.props.createJob(this.props.currentUser.id.toString(), this.props.state.jobObj)
      .then( result => {
        result === 'success' ? this.props.nextStep() : this.props.errorStep()
      })
  }

  render() {
    const { state } = this.props
    return (
      <div className="card-item">
        <div className="card-item-info">
          <label>Job Creator: </label>
          <p>{state.jobObj.jobCreator}</p>
          <label>Job Name: </label>
          <p>{state.jobObj.jobName}</p>
          <label>Job Creator: </label>
          <p>{state.jobObj.jobCreator}</p>
          <label>Job Dates: </label>
          <p>{state.jobObj.jobDates.map( date => {
            return date
          })}</p>
          <label>Job Location: </label>
          <p>{state.jobObj.jobLocation}</p>
          <label>Preferred Contact: </label>
          <p>{state.jobObj.jobContact}</p>
          <label>Job Invitations: </label>
          <ul>
            {state.usersAssigned.map( (user, key) => {
              return <li key={key}>{user[0].firstName}: {user[1]}</li>
            })}
          </ul>
          <FormButton
            className="button-primary"
            buttonText="Send Invite and Create Job"
            onClick={this.saveAndContinue}
          />
        </div>
      </div>
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