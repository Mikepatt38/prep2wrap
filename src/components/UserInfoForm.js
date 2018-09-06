import React, { Component, Fragment } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

class UserInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { firstName, lastName, email } = this.state
    const { setName } = this.props
    console.log(this.props)
    
    return (
      <form
        method="form"
        className="form-account-body--general"
      >
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
        <FormButton
          onClick={(e) => setName(this.props.currentUser.id, firstName, lastName, e)}
          className="button-primary"
          buttonText="Update Name"
        />
      </form>
    )
  }
}

export default UserInfoForm