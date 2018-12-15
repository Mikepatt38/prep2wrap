import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import { UserSearchForm } from './UserSearchForm';

export class UserSearch extends Component {

  render() {
    const { searchUsersByName } = this.props
    
    return (
      <UserSearchForm
        searchUsersByName={searchUsersByName}
      />
    )
  }
}