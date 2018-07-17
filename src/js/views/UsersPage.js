import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../components/withAuthorization'

class UsersPage extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="page-title">Find A User</h1>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition)
)(UsersPage)