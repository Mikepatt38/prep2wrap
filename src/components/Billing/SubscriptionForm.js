import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
// import SubscriptionForm from '../Billing/SubscriptionForm'

class SubscriptionForm extends Component {
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
    loading: false,
    toggleStripeSubscription: false,
    buttonText: 'SignUp',
    stripeUserId: null
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

  setUpStripeAndUser = async (e) => {
    e.preventDefault()
    this.setState({
      loading: true,
    })
    // Reset any old errors so they won't show when we login
    this.props.resetErrors(false, '', '')

    if(this.validateForm()) {
      this.setState({
        buttonText: 'Creating your account now...'
      })
      // Call function in backend to create the user with the given email
      // And we create the source to also connect it to the created user
      // To subscribe them to the plan

      // Creating the source
      let source
      source = await this.props.stripe.createSource({ type: 'card', 
        owner: { 
          name: `${this.state.firstName} ${this.state.lastName}`,
          email: this.state.email,
          phone: this.state.mobileNumber
        } 
      });
      // If we get the source then we send that and the email to the server to create
      // the user and subscribe them to the subscription
      if(source){
        const postBody = {
          userName: `${this.state.firstName} ${this.state.lastName}`,
          userEmail: this.state.email,
          stripeSourceId: source.source.id
        }
        // We send this info to the server to create with Stripe
        let response = await fetch("/create-user-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          },
          // dataType: "json",
          body: JSON.stringify(postBody)
        }) 
        console.log(response)
        // Getting the Customer ID back from the server
        let jsonResponse = await response.json()
        let responseObj = await JSON.stringify(jsonResponse)
        let jsonObj = await JSON.parse(responseObj)
        let stripe_id = await jsonObj.stripe_id
        // Actually sign the user up
        this.props.signUpUser(this.state.email, this.state.passwordOne, this.state.firstName, this.state.lastName, this.state.mobileNumber, stripe_id, this.props.history)
          .then( () => {
            // send an email using GCF to the user and owner about the new user
            console.log('Lets send an email notification')
            fetch("https://us-central1-the-calltime.cloudfunctions.net/sendMail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
              },
              // dataType: "json",
              body: 'michael@outlyrs.com'
          })
        })
      }
      else{
        console.log('No source was created')
      }
    }
    else{
      // Form was not validated, input errors will show for uncompleted inputs,
      // stop loading the form so user can input necessary fields
      this.setState({
        loading: false
      })
    }
  }

  validateForm = () => {
    const { firstName, lastName, email, passwordOne, passwordTwo, mobileNumber } = this.state
    let validated = true
    if ( firstName.length === 0 ) {
      this.setState({ firstNameError: true})
      validated = false
    }
    if ( lastName.length === 0) {
      this.setState({ lastNameError: true })
      validated = false
    }
    if ( email.length === 0) {
      this.setState({ emailError: true })
      validated = false
    }
    if ( mobileNumber.length === 0) {
      this.setState({ mobileNumberError: true })
      validated = false
    }
    if( passwordOne.length < 7 || passwordOne.length === 0 || passwordTwo.length === 0 || passwordOne !== passwordTwo ) {
      this.setState({ passwordOneError: true, passwordTwoError: true })
      validated = false
    }
    return validated
  }

  render() {
    return (
      <fieldset disabled={this.state.loading && !this.props.error}>
        <form 
          className="signUpForm"
          onSubmit={(e) => this.setUpStripeAndUser(e)}  
        >
          <FormTextInput
            label="First Name"
            type="text"
            name="firstName"
            className="form-group--half"
            value={this.state.firstName}
            onChange={this.handleChange}
            error={this.state.firstNameError}
            errorMsg="A first name is required."
          />
          <FormTextInput
            label="Last Name"
            type="text"
            name="lastName"
            className="form-group--half"
            value={this.state.lastName}
            onChange={this.handleChange}
            error={this.state.lastNameError}
            errorMsg="A last name is required."
          />
          <FormTextInput
            label="Email"
            type="email"
            name="email"
            className="form-group--half"
            // className={error && 'field-error'}
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.emailError}
            errorMsg="Please enter a valid email address"
          />
          <FormTextInput
            label="Mobile Number"
            type="tel"
            name="mobileNumber"
            className="form-group--half"
            value={this.state.mobileNumber}
            onChange={this.handleChange}
            error={this.state.mobileNumberError}
            errorMsg="Please enter a valid mobile number"
          />
          <FormTextInput
            label="Password"
            name="passwordOne"
            className="form-group--half"
            onChange={this.handleChange}
            value={this.state.passwordOne}
            type="password"
            error={this.state.passwordOneError}
            errorMsg="Your passwords must match and be at least 8 characters"
          />
          <FormTextInput
            label="Confirm Password"
            name="passwordTwo"
            className="form-group--half"
            onChange={this.handleChange}
            value={this.state.passwordTwo}
            type="password"
            error={this.state.passwordTwoError}
          />
          <div className="form-group">
            <label>Add Card Information</label>
            <p className="form-input-text">You will not be charged for the first 14 days.</p>
            <div className="checkout">
              <CardElement />
            </div>
          </div>
          <FormButton
            className="button-primary auth"
            buttonText={this.state.buttonText}
          />    
        </form>
      </fieldset>
    )
  }
}

export default injectStripe(SubscriptionForm)