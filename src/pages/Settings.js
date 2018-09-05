import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { NameForm, InlineForm } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import { Card } from '../components/Card'
import { UserProfileForm, ProfileDisplayed } from '../components/UserProfileForm'
import { Modal } from '../components/Modal'
import EditIcon from '../img/icon-edit.svg'

class AccountSettings extends Component {
  state = {
    nameEditable: false,
    emailEditable: false
  }

  render() {
    const { nameEditable, emailEditable } = this.state
    const { currentUser, setName, setEmail } = this.props

    return (
      <div className="container">
        <h1 className="page-title">Account Settings</h1>
        <div className="settings">
          <Card 
            cardTitle="Basic Information"
            cardText="Your basic account information, hover over the text to update the field."
            children={
              <Fragment>
                <div className="card-item" onClick={() => this.setState({ nameEditable: true })}>
                  <label>Account Name: </label>
                  { nameEditable ? <InlineForm values={[currentUser.firstName, currentUser.lastName]} onClick={setName} /> : <p> {currentUser.firstName} {currentUser.lastName} <img src={EditIcon} alt="edit icon" /></p> }
                </div>
                <div className="card-item" onClick={() => this.setState({ nameEditable: true })}>
                  <label>Account Email: </label>
                  { emailEditable ? <InlineForm values={[currentUser.email]} onClick={setEmail} /> : <p> {currentUser.email} <img src={EditIcon} alt="edit icon" /></p> }
                </div>
              </Fragment>
              }
          />

        </div>
      </div>
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