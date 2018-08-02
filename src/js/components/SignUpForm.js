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
        <div className="form-wrap">
          <form onSubmit={this.onSubmit}>
            <legend>Get Started Today!</legend>
            <div className="form-link">
              Already A Member? &nbsp;
              <Link to="/login">
                <span>Login</span>
              </Link>
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input 
                name="firstName"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input 
                name="lastName"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                name="email"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                name="passwordOne"
                onChange={this.handleChange}
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                name="passwordTwo"
                onChange={this.handleChange}
                type="password"
              />
            </div>
            <button className="btn-form" disabled={isValid} type="submit">
              Create Account
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
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