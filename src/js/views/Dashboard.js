import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'
import { api } from '../../db';
import { db } from '../../db/firebase'

const Loading = () => {
  return (
    <p>Loading...</p>
  )
}

class Dashboard extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    const { authUser } = this.props
    console.log(authUser)
    api.onceGetUsers().then( snapshot => {
      console.log(snapshot)
    })
    // db.collection('users')
    // .doc(authUser.id) // change to the current user id 
    // .get().then((user)=>{
    //   console.log(user)
    // })
  }

  render() {
    const { users } = this.props
    const { authUser } = this.props

    return (
      <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>
        {/* {console.log(authUser)} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.userState.users,
  authUser: state.sessionState.authUser,
})

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard)