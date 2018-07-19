import React, { Component } from 'react'
import { auth, api } from '../../db'

class SignUpForm extends Component {

  state = {
    firstName: '',
    lastName: '',
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
    const { firstName, lastName, email, passwordOne } = this.state

    const { history } = this.props
    
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then( authUser => {
        api.doCreateUser(authUser.user.uid.toString(), firstName, lastName, email)
          .then( () => {
            this.setState({ firstName: '', lastName: '', email: '', passwordOne: '', passwordTwo: '', error: null })
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
    const { firstName, lastName, email, passwordOne,  passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || firstName === '' || lastName === ''

    return (
      <form className="form-login" onSubmit={this.onSubmit}>
        <legend>Sign Up</legend>
        <input 
          name="firstName"
          onChange={this.handleChange}
          type="text"
          placeholder="First Name"
        />
        <input 
          name="lastName"
          onChange={this.handleChange}
          type="text"
          placeholder="Last Name"
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