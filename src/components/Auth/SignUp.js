import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormBillingCheckbox } from '../Forms/FormBillingCheckbox'
import { FormButton } from '../Forms/FormButton'
import logo from '../../img/calltime-logo.png'

export class SignUp extends Component {
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
      this.setState({
        loading: false
      })
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

  handleUserSignUp = (e) => {
    e.preventDefault()
    this.setState({
      loading: true
    }, () => {
      if(this.validateForm()) {
        this.props.signUpUser(this.state.email, this.state.passwordOne, this.state.firstName, this.state.lastName, this.state.mobileNumber, this.props.history)
      }
      else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    const { error, errorText } = this.props
    return (
      <div className="authPage">
        <div className="authContainer auth-container--signup">
          <div className="auth-logo">
            <img src={logo} alt="The official logo" />
          </div>
          <div className="auth-card auth-card-large">
            <div className="auth-card-header">
              <h3>Create New Account</h3>
              <p>Signup to get started today using your account right away.</p>     
            </div>
            <div className="auth-card-body">
              { error && <p className="error-text">{errorText}</p> }
              <SignUpForm 
                state={this.state}
                error={error}
                handleChange={this.handleChange}
                handleCheck={this.handleCheck}
                handleUserSignUp={this.handleUserSignUp}
              />
            </div>
          </div>
          <div className="auth-external-link">
            <p>Already have an account?</p> &nbsp;
            <Link to="/login" className="link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const SignUpForm = ({state, error, handleChange, handleCheck, handleUserSignUp}) => (
  <fieldset disabled={state.loading && !error}>
    <form 
      className="signUpForm"
      onSubmit={(e) => handleUserSignUp(e)}  
    >
      <FormTextInput
        label="First Name"
        type="text"
        name="firstName"
        value={state.firstName}
        onChange={handleChange}
        error={state.firstNameError}
        errorMsg="A first name is required."
      />
      <FormTextInput
        label="Last Name"
        type="text"
        name="lastName"
        value={state.lastName}
        onChange={handleChange}
        error={state.lastNameError}
        errorMsg="A last name is required."
      />
      <FormTextInput
        label="Email"
        type="email"
        name="email"
        className={error && 'field-error'}
        value={state.email}
        onChange={handleChange}
        error={state.emailError}
        errorMsg="Please enter a valid email address"
      />
      <FormTextInput
        label="Mobile Number"
        type="tel"
        name="mobileNumber"
        value={state.mobileNumber}
        onChange={handleChange}
        error={state.mobileNumberError}
        errorMsg="Please enter a valid mobile number"
      />
      <FormTextInput
        label="Password"
        name="passwordOne"
        className="form-group--half"
        onChange={handleChange}
        value={state.passwordOne}
        type="password"
        error={state.passwordOneError}
        errorMsg="Your passwords must match and be at least 8 characters"
      />
      <FormTextInput
        label="Confirm Password"
        name="passwordTwo"
        className="form-group--half"
        onChange={handleChange}
        value={state.passwordTwo}
        type="password"
        error={state.passwordTwoError}
      />
      <FormBillingCheckbox
        onChange={handleCheck}
        freeTrialValue={state.freeTrial}
        proMembershipValue={state.proMembership}
      />
      <FormButton
        className="button-primary full"
        buttonText="Sign Up"
      />    
    </form>
  </fieldset>
)