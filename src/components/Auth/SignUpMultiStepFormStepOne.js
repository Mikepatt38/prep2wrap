import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormBillingCheckbox } from '../Forms/FormBillingCheckbox'
import { FormButton } from '../Forms/FormButton'

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
    if( passwordOne.length == 0 || passwordTwo.length == 0 || passwordOne !== passwordTwo ) {
      this.setState({ passwordOneError: true, passwordTwoError: true })
      validated = false
    }
    return validated
  }

  signUpUserAndContinue = (e) => {
    e.preventDefault()
    this.setState({
      loading: true
    }, () => {
      if(this.validateForm()) {
        this.props.signUpUser(this.state.email, this.state.passwordOne, this.state.firstName, this.state.lastName, this.state.mobileNumber)
        .then( result => {
          result === 'success' 
          ? this.props.saveAndContinue(e)
          : this.props.errorAndStop(e)
        })
      }
      else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <fieldset disabled={this.state.loading}>
        <form className="signUpForm">
          <h2 className="signUpFormTitle">Let's get you signed up.</h2>  
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
            className="form-group--half"
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
            className="form-group--half"
            value={this.state.passwordOne}
            type="password"
            error={this.state.passwordOneError}
            errorMsg="Your passwords must match and be at least 8 characters"
          />
          <FormTextInput
            label="Confirm Password"
            name="passwordTwo"
            onChange={this.handleChange}
            className="form-group--half"
            value={this.state.passwordTwo}
            type="password"
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
    )
  }
}