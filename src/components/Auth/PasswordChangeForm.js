import React, { Component } from 'react'
import { auth } from '../../db'

class PasswordChangeForm extends Component {
  state = {
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
    const { passwordOne } = this.state
    
    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ passwordOne: '', passwordTwo: '', error: null }))
      })
      .catch(error => {
        this.setState({ error: error })
      })
    e.preventDefault()
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          onChange={this.handleChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          onChange={this.handleChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isValid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default PasswordChangeForm