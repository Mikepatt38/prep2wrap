import React, { Component } from 'react'
import moment from 'moment'
import { CreateJobFormStepOne } from './CreateJobFormStepOne'
import { CreateJobFormStepTwo } from './CreateJobFormStepTwo'
import { CreateJobFormStepThree } from './CreateJobFormStepThree'
import { SendSMSTwilio } from './SendSMSTwilio'
   
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
    step: 0,
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
    console.log(step)
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
      case 0:
        return (
          <div className="card">
            <div className="card-header">
              <h3>Create A Job</h3>
              <p>Create a job to hire other local professionals to your project.</p>
              <button 
                className="button-form"
                onClick={this.nextStep}
              >
                Create A New Job
              </button>   
            </div>
          </div>   
        )
      case 1:
        return (
          <CreateJobFormStepOne
            state={this.state}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            handleMultiSelect={this.handleMultiSelect}
            handleLocationSelect={this.handleLocationSelect}
            handleSelect={this.handleSelect}
            handleDateChange={this.handleDateChange}
            setJobObjData={this.props.setJobObjData}
            removeDate={this.removeDate}
          />   
        )
      case 2:
        return (
          <CreateJobFormStepTwo
            state={this.state} 
            nextStep={this.nextStep}
            prevStep={this.prevStep} 
            userResultsForJobCreation={this.props.userResultsForJobCreation}
            setUserModal={this.props.setUserModal}
            userModalActive={this.props.userModalActive}
            assignedUsers={this.assignedUsers}
          />   
  
        )
      case 3:
        return <CreateJobFormStepThree
                state={this.state}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                currentUser={this.props.currentUser}
                createJob={this.props.createJob}
              />
      case 4: 
        return (
          <SendSMSTwilio
            users={this.state.usersAssigned}
            nextStep={this.nextStep}
            errorStep={this.errorStep}
          />
        )
      case 'error':
        return <div>
                <p>Oops! Something went wrong, try recreating your job to fix the error!</p>
              </div>
    }
  
  }
}



