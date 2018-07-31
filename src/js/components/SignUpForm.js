import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { signUpUser } from '../../actions/users'

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
    this.props.signUpUser(email, passwordOne, firstName, lastName, history)
    e.preventDefault()
    // this.setState({ firstName: '', lastName: '', email: '', passwordOne: '', passwordTwo: '', error: null })
  }

  render() {
    const { firstName, lastName, email, passwordOne,  passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || firstName === '' || lastName === ''

    return (
      <React.Fragment>
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
            Create Account
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <Link to="/login" className="form-footer">
          Already A Member? <span>Login</span>
        </Link>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: bindActionCreators(signUpUser, dispatch)
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(SignUpForm)