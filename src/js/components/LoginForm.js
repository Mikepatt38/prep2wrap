import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api, auth } from '../../db'
import { PasswordResetLink } from '../components/PasswordResetForm'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    const { email, password } = this.state

    const { history, onSetCurrentUserProfile } = this.props
    
    auth.doSignInWithEmailAndPassword(email, password)
      .then( authUser => {
        api.getCurrentUserProfile(authUser.user.uid.toString()).then ( user => {
          onSetCurrentUserProfile(user)
          console.log("API HIT FINUUCCCKKK")
        })
        this.setState(() => ({
          email: '',
          password: '',
          error: null
        }))
        history.push("/dashboard")
      })
      .catch(error => {
        this.setState({ error: error })
      })
    e.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isValid = password === '' || email === '' 

    return (
      <form className="form-login padding-bottom" onSubmit={this.onSubmit}>
        <legend>Log In</legend>
        <input
          name="email"
          onChange={this.handleChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <button className="btn-primary" disabled={isValid} type="submit">
          Login
        </button>

        <PasswordResetLink />

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  currentUserProfile: state.userState.currentUserProfile,
})

const mapDispatchToProps = (dispatch) => ({
  onSetCurrentUserProfile: (user) => dispatch({type: 'SET_CURRENT_USER_PROFILE', user})
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(LoginForm) 