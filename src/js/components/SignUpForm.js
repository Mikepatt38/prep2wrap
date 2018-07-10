import React, { Component } from 'react'
import { auth, api } from '../../db'

class SignUpForm extends Component {

  state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    const { username, email, passwordOne } = this.state

    const { history } = this.props
    
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then( authUser => {
        api.doCreateUser(authUser.user.uid, username, email)
          .then( () => {
            this.setState({ username: '', email: '', passwordOne: '', passwordTwo: '', error: null })
            history.push('/account-settings')
          })
          .catch(error => {
            this.setState({ error: error })
          })
        })
        .catch(error => {
          this.setState({ error: error })
      })
    e.preventDefault()
  }

  render() {
    const { username, email, passwordOne,  passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''

    return (
      <form className="form-login" onSubmit={this.onSubmit}>
        <legend>Sign Up</legend>
        <input 
          name="username"
          onChange={this.handleChange}
          type="text"
          placeholder="First and Last Name"
        />
        <input
          name="email"
          onChange={this.handleChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="passwordOne"
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          onChange={this.handleChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button className="btn-primary" disabled={isValid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default SignUpForm