import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'

export class UserSearchForm extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.searchUsersByName(this.state.firstName, this.state.lastName)
    this.setState({
      firstName: '',
      lastName: ''
    })
  }

  render() {
    const { firstName, lastName } = this.state

    return (
      <form
        method="form"
        className="card-form card-form-inline"
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
        <div className="button-wrapper">
          <FormButton
            onClick={(e) => this.handleClick(e)}
            className="button-primary"
            buttonText="Search"
          />
        </div>
      </form>
    )
  }
}