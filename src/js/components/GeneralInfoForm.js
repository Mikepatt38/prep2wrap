import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setName, setEmail } from '../../actions/accounts'
import { setAlert } from '../../actions/components'

class GeneralInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,
    nameEditable: false,
    emailEditable: false,
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

  onGeneralEdit = (e) => {
    e.preventDefault()
    this.setState({ nameEditable: true })
  }

  onEmailEdit = (e) => {
    e.preventDefault()
    this.setState({ emailEditable: true })
  }

  onGeneralSubmit = (e) => {
    const { firstName, lastName } = this.state
    e.preventDefault()
    this.props.setName(this.props.currentUser.id, firstName, lastName)
    this.setState({ firstName: '', lastName: ''})
  }

  onEmailSubmit = (e) => {
    const { currentUser } = this.props
    const { email } = this.state
    e.preventDefault()
    this.props.setEmail(currentUser.id, email)
    this.setState({ email: ''})
  }

  onDeactivateSubmit = (e) => {
    e.preventDefault()
    alert('Deactivate')
  }

  render() {
    const { firstName, lastName, email, nameEditable, emailEditable } = this.state
    const { currentUser } = this.props
    const isValidName = firstName !== '' || lastName !== ''
    const isValidEmail = email !== ''
    return (
      <div className="grid-account-body grid-account-body--general">
        <div className="grid-account-body--header">
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
                placeholder={currentUser.firstName}
                value={firstName}
                disabled={!nameEditable}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input 
                name="lastName"
                onChange={this.handleChange}
                type="text"
                placeholder={currentUser.lastName}
                value={currentUser.lastName}
                disabled={!nameEditable}
              />
            </div>
            <button 
              type="submit"
              className={!nameEditable ? 'btn-form' : 'btn btn-hidden'}
              onClick={this.onGeneralEdit}
            > Edit </button>
            <button 
              type="submit"
              className={!nameEditable ? 'btn btn-hidden' : 'btn-form'}
              onClick={this.onGeneralSubmit}
            > Update Name </button>
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
                placeholder={currentUser.email}
                value={email}
                disabled={!emailEditable}
              />
            </div>
            <div className="form-group form-group--btn">
              <button 
                type="submit"
                className={!emailEditable ? 'btn-form btn-short' : 'btn btn-hidden'}
                onClick={this.onEmailEdit}
              > Edit </button>
              <button 
                type="submit"
                className={!emailEditable ? 'btn btn-hidden' : 'btn-form btn-short'}
                onClick={this.onEmailSubmit}
              > Update </button>
            </div>
          </form>
        </div>
        <div className="grid-account--deactivate">
          <p>This will permanently delete your account and all of your data.</p>
          <button 
            type="submit"
            className="btn-form btn-danger"
            onClick={this.onDeactivateSubmit}
          > Deactive Account </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setName: bindActionCreators(setName, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
    onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(GeneralInfoForm)