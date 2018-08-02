import React, { Component } from 'react'
import { auth } from '../../db'
import { Link } from 'react-router-dom'

const margin = {
  marginBottom: '50px'
}

class PasswordResetForm extends Component {
  state = {
    email: '',
    error: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    const { email } = this.state
    
    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ email: '', error: null }))
      })
      .catch(error => {
        this.setState({ error: error })
      })
    e.preventDefault()
  }

  render() {
    const { email, error } = this.state

    const isValid = email === '' 

    return (
      <div className="form-wrap">
        <form onSubmit={this.onSubmit}>
          <legend style={margin}>Reset Your Password</legend>
          <div className="form-group">
            <label>Email To Send Password Reset:</label>
            <input
              name="email"
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <button className="btn-form" disabled={isValid} type="submit">
            Send Me A Reset Link
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
}

const PasswordResetLink = () => {
  return (
    <p className="form-page-text">
      <Link to="/password-reset">Forgot Password?</Link>
    </p>
  )
}

export default PasswordResetForm

export { PasswordResetLink }