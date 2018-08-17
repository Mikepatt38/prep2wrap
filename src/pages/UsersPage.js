import React, { Component } from 'react'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'
import { UserTable } from '../components/UserTable'


class UsersPage extends Component {
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
    const { searchUsersByName, userSearchByNameResults } = this.props
    return (
      <div className="container">
        <h1 className="page-title">Search For Users</h1>
        <Card
          cardText="Search for users by their first or last name."
          children={<UserSearch state={this.state} handleChange={this.handleChange} searchUsersByName={searchUsersByName} />}
        />
        <UserTable 
          users={userSearchByNameResults}
        />
      </div>
    )
  }
}

export default UsersPage