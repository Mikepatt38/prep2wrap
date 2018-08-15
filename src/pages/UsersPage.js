import React, { Component } from 'react'
import { UserSearch } from '../components/UserSearch'

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
        <UserSearch state={this.state} handleChange={this.handleChange} searchUsersByName={searchUsersByName} />
        { userSearchByNameResults !== [] &&
          userSearchByNameResults.map(user => {
            return <p key={user.id}>{user.firstName}</p>
          })
        }
      </div>
    )
  }
}

export default UsersPage