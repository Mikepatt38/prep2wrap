import React, { Component } from 'react'
import withAuthorization from '../components/withAuthorization'
import { api } from '../../db';

class Dashboard extends Component {
  state = {
    users: null
  }

  componentDidMount() {
    api.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    )
  }

  render() {
    const { users } = this.state

    return (
      <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>
    
        {!!users && Object.keys(users).map(key =>
          <div key={key}>{users[key].username}</div>
        )}
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser
export default withAuthorization(authCondition)(Dashboard)