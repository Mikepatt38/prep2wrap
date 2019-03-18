import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormBillingCheckbox } from '../Forms/FormBillingCheckbox'
import { FormButton } from '../Forms/FormButton'
import CreateIllustration from '../../img/illustration-create.svg'

export class SignUpMultiStepFormOne extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    mobileNumber: '',
    mobileNumberError: false,
    emailError: false,
    passwordOneError: false,
    firstNameError: false,
    lastNameError: false,
    freeTrial: false,
    proMembership: false,
    loading: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name+'Error']: false
    })
    if(e.target.name === 'email' && this.props.error) {
      this.props.resetErrors(false, '', '')
    }
  }

  handleCheck = e => {
    const newVal = e.target.checked
    const name = e.target.id
    this.setState({
      freeTrial: false,
      proMembership: false,
      [name]: newVal
    })
  }

  validateForm = () => {
    const { firstName, lastName, email, passwordOne, passwordTwo, mobileNumber } = this.state
    let validated = true
    if ( firstName.length == 0 ) {
      this.setState({ firstNameError: true})
      validated = false
    }
    if ( lastName.length == 0) {
      this.setState({ lastNameError: true })
      validated = false
    }
    if ( email.length == 0) {
      this.setState({ emailError: true })
      validated = false
    }
    if ( mobileNumber.length == 0) {
      this.setState({ mobileNumberError: true })
      validated = false
    }
    if( passwordOne.length < 7 || passwordOne.length == 0 || passwordTwo.length == 0 || passwordOne !== passwordTwo ) {
      this.setState({ passwordOneError: true, passwordTwoError: true })
      validated = false
    }
    return validated
  }

  signUpUserAndContinue = (e) => {
    e.preventDefault()
    this.setState({
      loading: true
    }, async () => {
      if(this.validateForm()) {
        const result = await this.props.signUpUser(this.state.email, this.state.passwordOne, this.state.firstName, this.state.lastName, this.state.mobileNumber)
        result === 'success'
          ? this.props.saveAndContinue()
          : this.setState({ loading: false })
      }
      else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    const { error, errorText } = this.props
    return (
      <div className="auth-card auth-card-large">
        <div className="auth-card-header">
          <h3>Step 1/3: Lets get started.</h3>
          <p>First, we'll get your basic information to set up your account. Creating an account is effortless and painless, let's get started today.</p>     
        </div>
        <div className="auth-card-body">
          { error && <p className="error-text">{errorText}</p> }
          <fieldset disabled={this.state.loading && !error}>
            <form className="signUpForm">
              <FormTextInput
                label="First Name"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                className="form-group--half"
                error={this.state.firstNameError}
                errorMsg="A first name is required."
              />
              <FormTextInput
                label="Last Name"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                className="form-group--half"
                error={this.state.lastNameError}
                errorMsg="A last name is required."
              />
              <FormTextInput
                label="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className={error ? 'form-group--half field-error' : 'form-group--half'}
                error={this.state.emailError}
                errorMsg="Please enter a valid email address"
              />
              <FormTextInput
                label="Mobile Number"
                type="tel"
                name="mobileNumber"
                value={this.state.mobileNumber}
                onChange={this.handleChange}
                className="form-group--half"
                error={this.state.mobileNumberError}
                errorMsg="Please enter a valid mobile number"
              />
              <FormTextInput
                label="Password"
                name="passwordOne"
                onChange={this.handleChange}
                value={this.state.passwordOne}
                type="password"
                className="form-group--half"
                error={this.state.passwordOneError}
                errorMsg="Your passwords must match and be at least 8 characters"
              />
              <FormTextInput
                label="Confirm Password"
                name="passwordTwo"
                onChange={this.handleChange}
                value={this.state.passwordTwo}
                type="password"
                className="form-group--half"
                error={this.state.passwordTwoError}
              />
              <FormBillingCheckbox
                onChange={this.handleCheck}
                freeTrialValue={this.state.freeTrial}
                proMembershipValue={this.state.proMembership}
              />
              <div className="button-right">
                <FormButton
                  className="button-form"
                  buttonText="Next"
                  onClick={this.signUpUserAndContinue}
                />            
              </div>
            </form>
          </fieldset> 
        </div>
      </div>     
    )
  }
}