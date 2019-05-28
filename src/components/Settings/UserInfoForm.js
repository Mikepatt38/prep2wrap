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
    fileName: ''
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
        <FormTextInput
          label="First Name"
          name="firstName"
          type="text"
          onChange={this.handleChange}
          value={firstName}
        />
        <FormTextInput
          label="Last Name"
          name="lastName"
          type="text"
          onChange={this.handleChange}
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
          value={mobileNumber}
        />
        <div className="button-wrapper">
          <FormButton
            onClick={this.updateBasicInformation}
            className="button-primary"
            buttonText="Update"
            disabled={true}
          />
        </div>
      </form>
    )
  }
}

export default UserInfoForm