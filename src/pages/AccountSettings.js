import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NameForm } from '../components/NameForm'
import { EmailForm } from '../components/EmailForm'
import { Card } from '../components/Card'
import { UserProfileForm } from '../components/UserProfileForm'
import { Modal } from '../components/Modal'

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
    this.props.setAccountView('general')
  }

  onGeneralEdit = (e) => {
    e.preventDefault()
    this.setState({ nameEditable: true })
  }

  onProfileEdit = (e) => {
    e.preventDefault()
    this.setState ({ profileEditable: true })
  }

  onEmailEdit = (e) => {
    e.preventDefault()
    this.setState({ emailEditable: true })
  }

  handleChange = e => {
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
      modalTitle: 'Edit your name.',
      modalChildren: <NameForm state={this.state} id={currentUser.id} setName={setName} handleChange={this.handleChange} />
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
          <div className="account-settings-container">
            <h1 className="page-title">Account Settings</h1>
            <div className="grid-account">
              <div className="grid-account-nav">
                <ul>
                  <li className={accountView === 'general' ? 'active' : ''} onClick={() => setAccountView('general')}>General</li>
                  <li className={accountView === 'profile' ? 'active' : ''} onClick={() => setAccountView('profile')}>Profile</li>
                  <li>Billing</li>
                </ul>
              </div>
              { accountView === 'general' && 
                <button className="button-primary" onClick={(e) => this.editName(setName, currentUser, e)}>Edit Name</button>
                // <React.Fragment>
                //   <Card 
                //     cardText="This is your general account information, it can be updated at any time."
                //     children={<NameForm state={this.state} id={currentUser.id} setName={setName} handleChange={this.handleChange} onGeneralEdit={this.onGeneralEdit} />}
                //   />
                //   <Card 
                //     cardText="This is your account's public email address, it can be updated at any time."
                //     children={<EmailForm state={this.state} id={currentUser.id} setEmail={setEmail} handleChange={this.handleChange} onEmailEdit={this.onEmailEdit} />}
                //   />
                // </React.Fragment>
              }
              { accountView === 'profile' &&
                <Card 
                  cardText="This is your public profile information, it can be updated at any time."
                  children={<UserProfileForm state={this.state} id={currentUser.id} setUserProfile={setUserProfile} handleChange={this.handleChange} handleCheck={this.handleCheck} onProfileEdit={this.onProfileEdit} />}
                />
              }
            </div>
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