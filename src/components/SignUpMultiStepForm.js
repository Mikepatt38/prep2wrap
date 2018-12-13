import React, { Component } from 'react'
import UserProfileForm from '../components/UserProfileForm'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormBillingCheckbox } from './FormBillingCheckbox'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'
import { locationObj, skillsObj, positionsObj } from '../data/formOptions'
import { SignUpMultiStepFormOne } from './SignUpMultiStepFormStepOne'

export class SignUpMultiStepForm extends Component {
  state = {
    formStep: 0,
    loading: false,
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
      freeTrial: false,
      proMembership: false,
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
          freeTrial: false,
          proMembership: false,
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

  errorAndStop = (e) => {
    e.preventDefault()
    this.setState({
      formStep: 'error'
    })
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.setState({
      loading: false
    })
    this.nextStep()
  }

  setUserProfileAndContinue = async (e) => {
    this.setState({
      loading: true
    })
    const { userProfileInformation } = this.state
    e.preventDefault()
    this.props.setUserProfile(this.props.currentUser.id, userProfileInformation.username, userProfileInformation.location, userProfileInformation.skills, userProfileInformation.positions, userProfileInformation.fbLink, userProfileInformation.imdbLink, userProfileInformation.availability, userProfileInformation.travel, userProfileInformation.union, userProfileInformation.bilingual, userProfileInformation.unions, userProfileInformation.languages)
    .then( result => {
      result === 'success' 
      ?
        this.setState({ 
          loading: false
        },
        () => {
          this.saveAndContinue(e) 
        })
      : this.errorAndStop(e)
    })
  }


  renderView = (formStep) => {
    switch(formStep) {
      case 0:
        return (
          <SignUpMultiStepFormOne
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            signUpUser={this.props.signUpUser}
            saveAndContinue={this.saveAndContinue}
            signUpUserAndContinue={this.signUpUserAndContinue}
          />
        )
        break

      case 1:
        return (
          <SignUpFormStep2
            setUserProfileAndContinue={this.setUserProfileAndContinue}
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
        break

      case 'error':
        return <p>Error....</p>
    }
  }

  render(){
    return (
      <div>
        <SignUpFormNav
          formStep={this.state.formStep}
          loading={this.state.loading}
        />
        {this.renderView(this.state.formStep)}
      </div>
    )
  }
}

const SignUpFormNav = ({ formStep, loading }) => (
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
          <p className="stepName">Getting Started</p>
        </div>
      </li>
    </ul>
    <fieldset className={`steps-nav-progress step${formStep}`} disabled={loading} aria-busy={loading}></fieldset>
  </nav> 
)

class SignUpFormStep2 extends Component {

  render() {
    const { state, handleChange, handleCheck, handleSelect, setUserProfileAndContinue } = this.props
    return (
      <fieldset disabled={state.loading}>
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
              onClick={setUserProfileAndContinue}
              className="button-form"
              buttonText="Next"
            />
          </div>
        </form>  
      </fieldset>
    )
  }
}