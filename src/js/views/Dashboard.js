import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'

const Loading = () => {
  return (
    <p>Loading...</p>
  )
}

class Dashboard extends Component {
  state = {
    user: {
      username: '',
      email: '',
      id: ''
    }
  }

  render() {
    const { currentUserProfile } = this.props
    console.log(currentUserProfile)
    return (
      <div className="container">
        <h1 className="page-title">Welcome, {currentUserProfile.username}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUserProfile: state.userState.currentUserProfile,
})

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(Dashboard)