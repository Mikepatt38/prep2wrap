import React, { Component } from 'react'
import UserProfileForm from '../components/UserProfileForm'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormBillingCheckbox } from './FormBillingCheckbox'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'
import { locationObj, skillsObj, positionsObj } from '../data/formOptions'
import { SignUpMultiStepFormOne } from './SignUpMultiStepFormStepOne'
import { SignUpMultiStepFormStepTwo } from './SignUpMultiStepFormStepTwo'

export class SignUpMultiStepForm extends Component {
  state = {
    formStep: 0
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

  renderView = (formStep) => {
    switch(formStep) {
      case 0:
        return (
          <SignUpMultiStepFormOne
            signUpUser={this.props.signUpUser}
            saveAndContinue={this.saveAndContinue}
            signUpUserAndContinue={this.signUpUserAndContinue}
            errorAndStop={this.errorAndStop}
          />
        )
        break

      case 1:
        return (
          <SignUpMultiStepFormStepTwo
            setUserProfileAndContinue={this.setUserProfileAndContinue}
            setUserProfile={this.props.setUserProfile}
            saveAndContinue={this.saveAndContinue}
            errorAndStop={this.errorAndStop}
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