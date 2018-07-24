import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../../db'
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

    const { history } = this.props
    
    auth.doSignInWithEmailAndPassword(email, password)
      .then( authUser => {
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
      <React.Fragment>
        <form className="form-login" onSubmit={this.onSubmit}>
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

          {error && <p>{error.message}</p>}
        </form>
        <div className="form-footer">
          <Link to="/password-reset">
            Forgot Password? <span>Reset Your Password</span>
          </Link>
          <Link to="/signup">
            New To The Calltime? <span>Sign Up</span>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(LoginForm) 