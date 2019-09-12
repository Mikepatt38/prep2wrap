import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import ButtonLoadingIcon from '../../img/icon-button-loading.svg'

class PasswordChangeForm extends Component {
  state = {
    passwordCurrent: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    formActive: false,
    buttonLoading: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({
      buttonLoading: true
    })
    const { passwordOne, passwordCurrent } = this.state
    this.props.updateUserPassword(passwordCurrent, passwordOne)
    .then( () => {
      this.setState({
        passwordCurrent: '',
        passwordOne: '',
        passwordTwo: '',
      })
      setTimeout( () =>{
        this.setState({
          formActive: false,
          buttonLoading: false
        })
      }, 1000)
    })
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const isValid = passwordOne !== passwordTwo || passwordOne === ''

    return (

      this.state.formActive ?
      <form className="account-settings-user-inputs margin">
        {error && <p className="error-msg">{error.message}</p>}
        <FormTextInput
          label="Current Password"
          name="passwordCurrent"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordCurrent}
          autocomplete="current-password"
        />
        <FormTextInput
          label="New Password"
          name="passwordOne"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordOne}
          className="form-group--half"
          autocomplete="new-password"
        />
        <FormTextInput
          label="Confirm New Password"
          name="passwordTwo"
          type="password"
          onChange={this.handleChange}
          value={this.state.passwordTwo}
          className="form-group--half"
          autocomplete="new-password"
        />
        <div className="button-wrapper">
          <button type="button" onClick={() => this.setState({ formActive: false })} className="button-transparent">Cancel</button>
          <button 
          className={this.state.buttonLoading ? 'button-primary button-updating' : 'button-primary'}
          disabled={this.state.buttonLoading ? false : isValid}
          onClick={ (e) => this.onSubmit(e)}
          type="submit">
            { this.state.buttonLoading 
              ? <React.Fragment><img src={ButtonLoadingIcon} alt="Search Button Loading Icon" /> Updating</React.Fragment>
              : <React.Fragment>Reset My Password</React.Fragment>
            }
          </button>
        </div>
      </form>
      : 
      <button type="button" onClick={() => this.setState({ formActive: true })} className="button-link">Update Password</button>
    )
  }
}

export default PasswordChangeForm