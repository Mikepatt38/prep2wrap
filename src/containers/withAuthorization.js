import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { firebase } from '../db'

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push("/login")
        }
      })
    }

    render() {
      return this.props.currentUser !== null ? <Component {...this.props} /> : null
    }
  }

  const mapStateToProps = (state) => ({
    currentUser: state.userState.currentUser,
  })

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization)
}

export default withAuthorization