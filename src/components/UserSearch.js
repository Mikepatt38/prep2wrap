import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export class UserSearch extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleChange = (e, searchUsersByName) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // () => {
    //   searchUsersByName(this.state.searchTerm)
    // })
  }

  render() {
    const { firstName, lastName, searchTerm } = this.state
    const { searchUsersByName } = this.props

    return (
      <form
        method="form"
        className="card-form-general card-form-inline"
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
          onClick={(e) => searchUsersByName(searchTerm, e)}
          className="button-form"
          buttonText="Search"
        />
      </form>
    )
  }
}


// <FormButton
// onClick={(e) => searchUsersByName(searchTerm, e)}
// className="button-primary"
// buttonText="Search For Users"
// />