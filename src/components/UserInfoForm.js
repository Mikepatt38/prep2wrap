import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

class UserInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
    mobileNumber: this.props.currentUser.mobileNumber
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateBasicInformation = (e) => {
    e.preventDefault()
    const { currentUser } = this.props
    const { firstName, lastName, email, mobileNumber} = this.state
    firstName !== currentUser.firstName || lastName !== currentUser.lastName 
      ? this.props.setName(this.props.currentUser.id, firstName, lastName)
      : email !== currentUser.email 
        ? this.props.setEmail(this.props.currentUser.id, email)
        : this.props.setMobileNumber(this.props.currentUser.id, mobileNumber)
  }

  render() {
    const { firstName, lastName, email, mobileNumber } = this.state
    return (
      <form
        method="form"
        className="card-form-userName"
      >
        <FormTextInput
          label="First Name"
          name="firstName"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={firstName}
        />
        <FormTextInput
          label="Last Name"
          name="lastName"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={lastName}
        />
        <FormTextInput
          label="Email"
          name="email"
          type="email"
          onChange={this.handleChange}
          value={email}
        />
        <FormTextInput
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          onChange={this.handleChange}
          className="form-group--half"
          value={mobileNumber}
        />
        <div className="button-wrapper">
          <FormButton
            onClick={this.updateBasicInformation}
            className="button-form"
            buttonText="Update"
          />
        </div>
      </form>
    )
  }
}

export default UserInfoForm