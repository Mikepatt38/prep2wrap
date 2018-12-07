import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUserUp, logo } = this.props
    return (
      <div className="page-background">
        <div className="modal" id="static">
          <div className="modal-header">
            <img src={logo} alt="Calltime Logo" />
            <h2>Create An Account</h2>
            <p>Create an account to get started.</p>
          </div>
          <div className="modal-body">
            <SignUpForm
              history={history}
              signUserUp={signUserUp}
              state={this.state}
            />
          </div>
          <div className="modal-footer">
            <MemberLink />
          </div>
        </div>
      </div>
    )
  }
}

const SignUpForm = ({ history, signUpUser, state}) => (
  <form
    method="post"
    onSubmit={(e) => signUpUser(state.email, state.passwordOne, state.firstName, state.lastName, history, e)}
  >
    <FormTextInput
      label="First Name"
      name="firstName"
      onChange={this.handleChange}
      errorMsg="A first name is required."
      className={state.firstNameInputClass}
      type="text"
    />
    <FormTextInput
      label="Last Name"
      name="lastName"
      onChange={this.handleChange}
      errorMsg="A last name is required."
      className={state.lastNameInputClass}
      type="text"
    />
    <FormTextInput
      label="Email"
      name="email"
      onChange={this.handleChange}
      errorMsg="Please enter your valid account email address"
      className={state.emailInputClass}
      type="email"
    />
    <FormTextInput
      label="Password"
      name="passwordOne"
      onChange={this.handleChange}
      errorMsg="A valid password is required."
      className={state.passwordInputClass}
      type="password"
    />
    <FormTextInput
      label="Confirm Password"
      name="passwordTwo"
      onChange={this.handleChange}
      type="password"
    />
    <FormButton
      className="button-form"
      buttonText="Create Account"
    />
  </form>
)

export const MemberLink = () => {
  return (
    <Link to="/login">
      <a>Already a member?</a>
    </Link>
  )
}