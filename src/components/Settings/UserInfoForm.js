import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import ProfileImageUpload from '../Settings/ProfileImageUpload'
import ButtonLoadingIcon from '../../img/icon-button-loading.svg'

class UserInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
    mobileNumber: this.props.currentUser.mobileNumber,
    fileName: '',
    buttonLoading: false
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentUser.avatarUrl !== this.props.currentUser.avatarUrl){
      this.setState({
        userAvatar: this.props.currentUser.avatarUrl
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateFileName = (fileName) => {
    this.setState({
      fileName
    })
  }

  didUserUpdate = () => {
    let disabled = true
    if(this.state.firstName !== this.props.currentUser.firstName ||
      this.state.lastName !== this.props.currentUser.lastName ||
      this.state.email !== this.props.currentUser.email ||
      this.state.mobileNumber !== this.props.currentUser.mobileNumber ||
      this.state.fileName !== ''){
        disabled = false
      }
    return disabled
  }

  updateBasicInformation = (e) => {
    e.preventDefault()
    this.setState({
      buttonLoading: true
    })
    let promises = []
    const { currentUser } = this.props
    const { firstName, lastName, email, mobileNumber, fileName} = this.state
    if(firstName !== currentUser.firstName || lastName !== currentUser.lastName){
      promises.push(this.props.setName(this.props.currentUser.id, firstName, lastName))
    }
    if(email !== currentUser.email){
      promises.push(this.props.setEmail(this.props.currentUser.id, email))
    }
    if(mobileNumber !== currentUser.mobileNumber){
      promises.push(this.props.setMobileNumber(this.props.currentUser.id, mobileNumber))
    }
    if(fileName !== ''){
      promises.push(this.props.uploadProfileImage(currentUser.id, currentUser.avatar, fileName))
    }
    Promise.all(promises).then( () => {
      setTimeout( () => {
        this.setState({
          buttonLoading: false
        })
      }, 250)
    })
  }

  render() {
    const { firstName, lastName, email, mobileNumber } = this.state
    return (
      <form
        method="form"
        className="account-settings-user-form"
      >
        <ProfileImageUpload
          currentUser={this.props.currentUser}
          updateFileName={this.updateFileName}
        />
        <div className="account-settings-user-inputs">
          <FormTextInput
            label="First Name"
            name="firstName"
            type="text"
            onChange={this.handleChange}
            value={firstName}
            className="form-group--half"
          />
          <FormTextInput
            label="Last Name"
            name="lastName"
            type="text"
            onChange={this.handleChange}
            value={lastName}
            className="form-group--half"
          />
          <FormTextInput
            label="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
          />
          <FormTextInput
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            onChange={this.handleChange}
            value={mobileNumber}
          />
          <div className="button-wrapper">
            <FormButton
              onClick={this.updateBasicInformation}
              className={this.state.buttonLoading ? 'button-primary button-updating' : 'button-primary'}
              buttonText={this.state.buttonLoading ? <React.Fragment><img src={ButtonLoadingIcon} alt="Search Button Loading Icon" /> Updating</React.Fragment> : 'Save Changes'}
              disabled={this.state.buttonLoading ? false : this.didUserUpdate()}
            />
          </div>
        </div>
      </form>
    )
  }
}

export default UserInfoForm