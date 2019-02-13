import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'

export  class PasswordReset extends Component {
  state = {
    email: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { resetPassword, history, logo } = this.props
    return (
      <div className="page-background">
        <div className="modal" id="static">
          <div className="modal-header">
            <img src={logo} alt="Calltime Logo" />
            <h2>Oh no!</h2>
            <p>Provide account email to receive a password reset link.</p>
          </div>
          <div className="modal-body">
            <PasswordResetForm
              history={history}
              resetPassword={resetPassword}
              state={this.state}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }

}

const PasswordResetForm =({ history, resetPassword, state, handleChange }) => (
  <form onSubmit={(e) => resetPassword(state.email, e)}>
    <FormTextInput
      label="Email"
      name="email"
      onChange={handleChange}
      errorMsg="Please enter your valid account email address"
      className={state.emailInputClass}
      type="text"
    />
    <FormButton
      className="button-form"
      buttonText="Send Reset Password Link"
    />
  </form>
)
