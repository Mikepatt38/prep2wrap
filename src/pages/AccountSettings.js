import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { NameForm, NameDisplay } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import { Card } from '../components/Card'
import { UserProfileForm, ProfileDisplayed } from '../components/UserProfileForm'
import { Modal } from '../components/Modal'
import EditIcon from '../img/icon-edit.svg'

class AccountSettings extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,
    username: this.props.currentUser.username === undefined ? '' : this.props.currentUser.username,
    location: this.props.currentUser.location === undefined ? '' : this.props.currentUser.location,
    headline: this.props.currentUser.headline === undefined ? '' : this.props.currentUser.headline,
    skills: this.props.currentUser.skills === undefined ? '' : this.props.currentUser.skills,
    fbLink: this.props.currentUser.fbLink === undefined ? '' : this.props.currentUser.fbLink,
    imdbLink: this.props.currentUser.imdbLink  === undefined ? '' : this.props.currentUser.imdbLink,
    availability: this.props.currentUser.availability === undefined ? false : this.props.currentUser.availability,
    bilingual: this.props.currentUser.bilingual === undefined ? false : this.props.currentUser.bilingual,
    travel: this.props.currentUser.travel === undefined ? false : this.props.currentUser.travel,
    union: this.props.currentUser.union === undefined ? false : this.props.currentUser.union,
    formMessage: 'This is your public profile information, it can be updated at any time.',
    modalActive: false,
    modalTitle: '',
    modalChildren: null
  }

  componentWillUnmount = () => {
    this.props.setAlert(false, '', '')
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = e => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  editName = (setName, currentUser, e) => {
    e.preventDefault()
    this.setState({
      modalActive: true,
      modalTitle: 'Edit your account name.',
      modalChildren: <NameForm state={this.state} id={currentUser.id} setName={setName} handleChange={this.handleChange} />
    })
  }

  editEmail = (setEmail, currentUser, e) => {
    e.preventDefault()
    this.setState({
      modalActive: true,
      modalTitle: 'Edit your account email.',
      modalChildren: <EmailForm state={this.state} id={currentUser.id} setEmail={setEmail} handleChange={this.handleChange} />
    })
  }

  resetModal = () => {
    this.setState({
      modalActive: false,
      modalTitle: '',
      modalChildren: null
    })
  }

  render() {
    const { firstName, lastName, email } = this.state
    const { setName, setEmail, currentUser, accountView, setAccountView, setUserProfile } = this.props
    return (
      <React.Fragment>
        { this.state.modalActive && 
          <Modal 
            title={this.state.modalTitle}
            children={this.state.modalChildren}
            toggleModal={this.resetModal}
          />
        }
        <div className="container">
          <h1 className="page-title">Account Settings</h1>
          <div className="grid-account">
            <Card 
              cardTitle="Basic Information"
              cardText="Your basic account information, hover over the text to update the field."
              children={
                <Fragment>
                  <div className="card-item" onClick={(e) => this.editName(setName, currentUser, e)}>
                    <label>Account Name: </label>
                    <p> {firstName} {lastName}</p>
                  </div>
                  <div className="card-item" onClick={(e) => this.editEmail(setEmail, currentUser, e)}>
                    <label>Account Email: </label>
                    <p> {email} <img src={EditIcon} alt="edit icon" /></p>
                  </div>
                </Fragment>
              }
            />
            <Card 
              cardTitle="Profile Settings"
              cardText="Your public account profile settings, other members can access and view your profile."
              children={<ProfileDisplayed state={this.state} />}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings