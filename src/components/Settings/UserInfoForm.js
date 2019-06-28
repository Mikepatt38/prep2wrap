import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import ProfileImageUpload from '../Settings/ProfileImageUpload';

class UserInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
    mobileNumber: this.props.currentUser.mobileNumber,
    fileName: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateFileName = (fileName) => {
    this.setState({
      fileName
    })
  }

  didUserUpdate = () => {
    let disabled = true
    if(this.state.firstName !== this.props.currentUser.firstName ||
      this.state.lastName !== this.props.currentUser.lastName ||
      this.state.email !== this.props.currentUser.email ||
      this.state.mobileNumber !== this.props.currentUser.mobileNumber ||
      this.state.fileName !== ''){
        disabled = false
      }
    return disabled
  }

  updateBasicInformation = (e) => {
    e.preventDefault()
    const { currentUser } = this.props
    const { firstName, lastName, email, mobileNumber, fileName} = this.state

    firstName !== currentUser.firstName || lastName !== currentUser.lastName && this.props.setName(this.props.currentUser.id, firstName, lastName)
    email !== currentUser.email && this.props.setEmail(this.props.currentUser.id, email)
    mobileNumber !== currentUser.mobileNumber && this.props.setMobileNumber(this.props.currentUser.id, mobileNumber)
    fileName !== '' && this.props.uploadProfileImage(currentUser.id, currentUser.avatar, fileName)
  }

  render() {
    const { firstName, lastName, email, mobileNumber } = this.state
    return (
      <form
        method="form"
        className="account-settings-user-form"
      >
        <ProfileImageUpload
          currentUser={this.props.currentUser}
          updateFileName={this.updateFileName}
        />
        <div className="account-settings-user-inputs">
          <FormTextInput
            label="First Name"
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={firstName}
            className="form-group--half"
          />
          <FormTextInput
            label="Last Name"
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={lastName}
            className="form-group--half"
          />
          <FormTextInput
            label="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
            className="form-group--half"
          />
          <FormTextInput
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            onChange={this.handleChange}
            value={mobileNumber}
            className="form-group--half"
          />
          <div className="button-wrapper">
            <FormButton
              onClick={this.updateBasicInformation}
              className="button-primary"
              buttonText="Update"
              disabled={this.didUserUpdate()}
            />
          </div>
        </div>
      </form>
    )
  }
}

export default UserInfoForm