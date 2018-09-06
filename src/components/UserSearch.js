import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export class UserSearch extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { firstName, lastName } = this.state
    const { searchUsersByName } = this.props

    return (
      <form
        method="form"
      >
        <FormTextInput
          label="First Name"
          name="firstName"
          type="text"
          onChange={this.handleChange}
          value={firstName}
          className="input--half"
        />
        <FormTextInput
          label="Last Name"
          name="lastName"
          type="text"
          onChange={this.handleChange}
          value={lastName}
          className="input--half"
        />
        <FormButton
          onClick={(e) => searchUsersByName(firstName, lastName, e)}
          className="button-primary"
          buttonText="Search For Users"
        />
      </form>
    )
  }
}
