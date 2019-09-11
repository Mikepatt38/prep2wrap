import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import { auth } from '../../db'

class PasswordChangeForm extends Component {
  state = {
    passwordCurrent: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    formActive: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = (e) => {
    e.preventDefault()
    const { passwordOne, passwordCurrent } = this.state
    this.props.updateUserPassword(passwordCurrent, passwordOne)
    .then( () => {
      this.setState({
        passwordCurrent: '',
        passwordOne: '',
        passwordTwo: '',
        formActive: false
      })
    })
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === ''

    return (

      this.state.formActive ?
      <form className="account-settings-user-inputs" onSubmit={this.onSubmit}>
        {error && <p className="error-msg">{error.message}</p>}
        <FormTextInput
          label="Current Password"
          name="passwordCurrent"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordCurrent}
        />
        <FormTextInput
          label="New Password"
          name="passwordOne"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordOne}
          className="form-group--half"
        />
        <FormTextInput
          label="Confirm New Password"
          name="passwordTwo"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordTwo}
          className="form-group--half"
        />
        <div className="button-wrapper">
          <button type="button" onClick={() => this.setState({ formActive: false })} className="button-transparent">Cancel</button>
          <button className="button-primary" disabled={isValid} type="submit">
            Reset My Password
          </button>
        </div>
      </form>
      : <button type="button" onClick={() => this.setState({ formActive: true })} className="button-transparent">Update Password</button>
    )
  }
}

export default PasswordChangeForm