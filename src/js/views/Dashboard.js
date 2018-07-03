import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'
import { api } from '../../db';

class Dashboard extends Component {
  state = {
    users: null
  }

  componentDidMount() {
    const { onSetUsers } = this.props

    api.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    )
  }

  render() {
    const { users } = this.props

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

const mapStateToProps = (state) => ({
  users: state.userState.users,
})

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)