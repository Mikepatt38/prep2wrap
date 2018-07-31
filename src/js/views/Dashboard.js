import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'

class Dashboard extends Component {

  render() {
    const { currentUser } = this.props
    console.log(currentUser)
    return (
      <div className="container">
        <h1 className="page-title">Welcome, {currentUser.username}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  currentUser: state.userState.currentUser
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Dashboard)