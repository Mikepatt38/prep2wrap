import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'

class Dashboard extends Component {
  state = {
    user: {
      username: '',
      email: '',
      id: ''
    }
  }

  render() {
    const { authUser } = this.props
    console.log(authUser)
    return (
      <div className="container">
        <h1 className="page-title">Welcome, {authUser.displayName}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Dashboard)