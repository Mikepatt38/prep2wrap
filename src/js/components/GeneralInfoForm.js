import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../db'
import { setAlert } from '../../actions/components'

class GeneralInfoForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    error: null
  }

  componentWillUnmount() {
    this.props.onSetAlert(false, '', '')
 }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onGeneralSubmit = (e) => {
    e.preventDefault()
    alert('General Info')
  }

  onEmailSubmit = (e) => {
    e.preventDefault()
    alert('Email')
  }

  onDeactivateSubmit = (e) => {
    e.preventDefault()
    alert('Deactivate')
  }

  render() {
    const { authUser, alertActive, alertType, alertText } = this.props
    const { firstName, lastName, email, error } = this.state
    const isValid = email === '' && firstName === '' && lastName === ''
    return (
      <div className="grid-account-body grid-account-body--general">
        <div className="grid-account-body--header">
          <h3>General Information</h3>
          <p>This is your general account information, it can be updated at any time.</p>            
        </div>
        <div className="grid-account-body--name">
          <form className="form-account-body--general">
            <div className="form-group">
              <label>First Name:</label>
              <input 
                name="firstName"
                onChange={this.handleChange}
                type="text"
                placeholder="Michael"
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input 
                name="lastName"
                onChange={this.handleChange}
                type="text"
                placeholder="Patterson"
                value={lastName}
              />
            </div>
            <button 
              type="submit"
              className="input-btn btn btn-primary"
              onClick={this.onGeneralSubmit}
            > Update </button>
          </form>
        </div>
        <div className="grid-account--email">
          <p>This is your account's email address, it can be updated at any time.</p>     
          <form className="form-account-body--general">
            <div className="form-group">
              <label>Email:</label>
              <input 
                name="email"
                onChange={this.handleChange}
                type="email"
                placeholder="michael@outlyrs.com"
                value={email}
              />
            </div>
            <div className="form-group form-group--btn">
              <button 
                type="submit"
                className="btn btn-primary"
                onClick={this.onEmailSubmit}
              > Update </button>
            </div>
          </form>
        </div>
        <div className="grid-account--deactivate">
          <p>This will permanently delete your account and all of your data.</p>
          <button 
            type="submit"
            className="input-btn btn btn-danger"
            onClick={this.onDeactivateSubmit}
          > Deactive Account </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  alertActive: state.sessionState.alertActive,
  alertType: state.sessionState.alertType,
  alertText: state.sessionState.alertText
})

const mapDispatchToProps = (dispatch) => ({
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(GeneralInfoForm)