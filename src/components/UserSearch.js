import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export class UserSearch extends Component {
  state = {
    searchTerm: ''
  }

  handleChange = (e, searchUsersByName) => {
    this.setState({
      [e.target.name]: e.target.value
    },
    () => {
      searchUsersByName(this.state.searchTerm)
    })
    // )
  }

  render() {
    const { searchTerm } = this.state
    const { searchUsersByName } = this.props

    return (
      <form
        method="form"
        className="user-search-form"
      >
        <div className="form-group input--half">
          <input 
            name="searchTerm"
            onChange={(e) => this.handleChange(e, searchUsersByName)}
            type="text"
            placeholder="Enter User's Name"
          />
        </div>
      </form>
    )
  }
}


// <FormButton
// onClick={(e) => searchUsersByName(searchTerm, e)}
// className="button-primary"
// buttonText="Search For Users"
// />