import React, { Component } from 'react'

class UsersList extends Component {
  state = {
    message: 'Search for users to return results'
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      message: nextProps.users.length === 0 ? 'There were no results' : this.state.message
    }) 
  }

  render() {
    const { users } = this.props
    const { message } = this.state
    return (
      users.length === 0 
      ? <p>{message}</p>
      :       
      <ul>
        {users.map( (user, index) => {
          return <li key={index}>{user.displayName}</li>
        })}
      </ul>
    )
  }
}

export default UsersList