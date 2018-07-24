import React, { Component } from 'react'
import { auth } from '../../db'
import { Link } from 'react-router-dom'

const style = {
  paddingBottom: '40px'
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
      <form className="form-login" onSubmit={this.onSubmit} style={style}>
        <legend>Reset Your Password</legend>
        <input
          name="email"
          onChange={this.handleChange}
          type="text"
          placeholder="Email"
        />
        <button className="btn-primary" disabled={isValid} type="submit">
          Send Me A Reset Link
        </button>

        {error && <p>{error.message}</p>}
      </form>
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