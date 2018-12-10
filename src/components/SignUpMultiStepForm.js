import React, { Component } from 'react'
import UserProfileForm from '../components/UserProfileForm'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'
import { locationObj, skillsObj, positionsObj } from '../data/formOptions'

export class SignUpMultiStepForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    emailError: false,
    passwordError: false,
    firstNameError: false,
    lastNameError: false,
    formStep: 0,
    userProfileInformation: {
      username: '',
      location: '',
      headline: '',
      skills: '',
      positions: '',
      fbLink: '',
      imdbLink: '',
      availability: '',
      bilingual: '', 
      languages: '',
      travel: '', 
      union: '', 
      unions: '',
    }
  }

  handleUserChange = e => {
    const newVal = e.target.value
    const name = e.target.name
    this.setState(prevState => ({
      userProfileInformation: {
          ...prevState.userProfileInformation,
          [name]: newVal
      }
    })
  )}

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleCheck = e => {
    const newVal = e.target.checked
    const name = e.target.id
    console.log('Check pressed:' +  e.target.checked)
    console.log('Checkbox id: ' + e.target.id)
    this.setState(prevState => ({
      userProfileInformation: {
          ...prevState.userProfileInformation,
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
      userProfileInformation: {
        ...prevState.userProfileInformation,
        [name]: tempArr
      }
    }))
  }

  nextStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep : formStep + 1
    })
  }

  prevStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep : formStep - 1
    })
  }

  errorStep = () => {
    const { formStep } = this.state
    this.setState({
      formStep: 'error'
    })
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.nextStep()
  }

  renderView = (formStep) => {
    const { setUserProfile, currentUser } = this.props
    switch(formStep) {
      case 0:
        return (
          <SignUpFormStep1
            state={this.state}
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            saveAndContinue={this.saveAndContinue}
          />
        )
        break

      case 1:
        return (
          <SignUpFormStep2
            saveAndContinue={this.saveAndContinue}
            state={this.state}
            handleChange={this.handleUserChange}
            handleCheck={this.handleCheck}
            handleSelect={this.handleMultiSelect}
          />
        )
        break
      
      case 2:
        console.log(this.state)
        return (
          <p>Uhm..</p>
        )
    }
  }

  render(){
    return (
      <div>
        <SignUpFormNav
          formStep={this.state.formStep}
        />
        {this.renderView(this.state.formStep)}
      </div>
    )
  }
}

const SignUpFormNav = ({ formStep }) => (
  <nav className="signUpFormNav">
    <ul className="steps-nav">
      <li className={formStep === 0 ? 'active' : ''}>
        <div>
          <p className="stepTitle">Step 1</p>
          <p className="stepName">Create your account</p>
        </div>
      </li>
      <li className={formStep === 1 ? 'active' : ''}>
        <div>
          <p className="stepTitle">Step 2</p>
          <p className="stepName">Your profile information</p>
        </div>
      </li>
      <li className={formStep === 2 ? 'active' : ''}>
        <div>
          <p className="stepTitle">Step 3</p>
          <p className="stepName">Setup your billing</p>
        </div>
      </li>
    </ul>
    <div className={`steps-nav-progress step${formStep}`}></div>
  </nav>
)

const SignUpFormStep1 = ({ state, nextStep, handleChange, saveAndContinue }) => {

  return (
    <form className="signUpForm">
      <h2 className="signUpFormTitle">Let's get you signed up.</h2>  
      <FormTextInput
        label="First Name"
        name="firstName"
        onChange={handleChange}
        errorMsg="A first name is required."
        className="form-group--half"
        value={state.firstName}
        type="text"
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        errorMsg="A last name is required."
        className="form-group--half"
        vale={state.lastName}
        type="text"
      />
      <FormTextInput
        label="Email"
        name="email"
        onChange={handleChange}
        errorMsg="Please enter your valid account email address"
        value={state.email}
        type="email"
      />
      <FormTextInput
        label="Password"
        name="passwordOne"
        onChange={handleChange}
        errorMsg="A valid password is required."
        className="form-group--half"
        value={state.passwordOne}
        type="password"
      />
      <FormTextInput
        label="Confirm Password"
        name="passwordTwo"
        onChange={handleChange}
        className="form-group--half"
        value={state.passwordTwo}
        type="password"
      />
      <div className="button-right">
        <FormButton
          className="button-form"
          buttonText="Next"
          onClick={saveAndContinue}
        />            
      </div>
    </form>
  )
}

class SignUpFormStep2 extends Component {

  render() {
    const { state, handleChange, handleCheck, handleSelect } = this.props
    return (
      <form className="signUpForm">
        <FormTextInput 
          label="Username"
          name="username"
          type="text"
          onChange={handleChange}
          className="form-group--half"
          value={state.userProfileInformation.username}
        />
        <FormSelectInput
          label="Location"
          name="location"
          options={locationObj}
          currentSkills={state.userProfileInformation.location}
          placeholder="Select Cities You Work In"
          isMultiSelect={true}
          onSelect={handleSelect}
          className="form-group--half"
        />
        <FormSelectInput
          label="Skills"
          name="skills"
          options={skillsObj}
          currentSkills={state.userProfileInformation.skills}
          placeholder="Select Skills You're Qualified For"
          isMultiSelect={true}
          onSelect={handleSelect}
        />
        <FormSelectInput
          label="Positions"
          name="positions"
          options={positionsObj}
          currentSkills={state.userProfileInformation.positions}
          placeholder="Select Positions For Jobs You're Seeking"
          isMultiSelect={true}
          onSelect={handleSelect}
        />
        <FormTextInput 
          label="Facebook Profile Link"
          name="fbLink"
          type="text"
          onChange={handleChange}
          className="form-group--half"
          value={state.userProfileInformation.fbLink}
        />
        <FormTextInput 
          label="IMDb Profile Link"
          name="imdbLink"
          type="text"
          onChange={handleChange}
          className="form-group--half"
          value={state.userProfileInformation.imdbLink}
        />
        <FormCheckboxInput
          label="Willing To Travel"
          checkboxId="travel"
          onChange={handleCheck}
          value={state.userProfileInformation.travel}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Daily Availability"
          checkboxId="availability"
          onChange={handleCheck}
          value={state.userProfileInformation.availability}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Bilingual"
          checkboxId="bilingual"
          onChange={handleCheck}
          value={state.userProfileInformation.bilingual}
          inputName="languages"
          inputLabel="List All Fluent Languages"
          inputValue={state.userProfileInformation.languages === undefined ? '' : state.userProfileInformation.languages}
          inputOnChange={handleChange}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Union"
          checkboxId="union"
          onChange={handleCheck}
          value={state.userProfileInformation.union}
          inputName="unions"
          inputLabel="List Union Names"
          inputValue={state.userProfileInformation.unions === undefined ? '' : state.userProfileInformation.unions}
          inputOnChange={handleChange}
          className="form-group--half"
        />
        <div className="button-right">
          <FormButton
            onClick={this.props.saveAndContinue}
            className="button-form"
            buttonText="Next"
          />
        </div>
      </form>  
    )
  }
}