import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserProfile, setAccountView } from '../../actions/accounts'
import { setAlert } from '../../actions/components'

class ProfileSettingsForm extends Component {
  state = {
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
    isEditable: false,
    formMessage: 'This is your public profile information, it can be updated at any time.'
  }

  componentWillMount = () => {
    const { currentUser } = this.props
    console.log(currentUser.username)
    currentUser.username === undefined 
      ? this.setState({
          isEditable: true,
          formMessage: 'Fill out the form below to update your public profile information.'
        })
      : null
  }

  componentWillUnmount = () => {
    this.props.onSetAlert(false, '', '')
    this.props.onSetAccountView('general')
 }

  onEdit = (e) => {
    e.preventDefault()
    this.setState({
      isEditable: true
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheck = e => {
    console.log(e.target.id)
    console.log(e.target.checked)
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  onUpdateUserProfile = e => {
    const { currentUser } = this.props
    const { username, location, headline, skills, fbLink, imdbLink, availability, bilingual, travel, union} = this.state
    e.preventDefault()
    this.props.setUserProfile(currentUser.id, username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual)
  }

  render() {
    console.log(this.state)
    const { username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual, isEditable, formMessage } = this.state
    return (
      <React.Fragment>
        <div className="grid-account-body grid-account-body--profile">
          <div className="grid-account-body--header">
            <p>{formMessage}</p>            
          </div>
          <form className="form-account-body--profile">
            <div className="form-group">
              <label>Username:</label>
              <input 
                name="username"
                onChange={this.handleChange}
                type="text"
                value={username}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input 
                name="location"
                onChange={this.handleChange}
                type="text"
                value={location}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group form-group--fullWidth">
              <label>Profile Headline:</label>
              <input 
                name="headline"
                onChange={this.handleChange}
                type="text"
                value={headline}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group form-group--fullWidth">
              <label>Skills:</label>
              <input 
                name="skills"
                onChange={this.handleChange}
                type="text"
                value={skills}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label>FB Link:</label>
              <input 
                name="fbLink"
                onChange={this.handleChange}
                type="text"
                value={fbLink}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label>IMDb Link:</label>
              <input 
                name="imdbLink"
                onChange={this.handleChange}
                type="text"
                value={imdbLink}
                disabled={!isEditable}
              />
            </div>  
            <div className="form-group">
              <label>Willing To Travel:</label>
              <span className="custom-checkbox">
                <input 
                  type="checkbox" 
                  id="travel" 
                  ref="travel" 
                  onChange={this.handleCheck}
                  checked={travel}
                  disabled={!isEditable}
                />
                <label className="checkbox" htmlFor="travel">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Daily Availability:</label>
              <span className="custom-checkbox">
                <input 
                  type="checkbox" 
                  id="availability" 
                  ref="availability" 
                  onChange={this.handleCheck}
                  checked={availability}
                  disabled={!isEditable}
                />
                <label className="checkbox" htmlFor="availability">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Bilingual:</label>
              <span className="custom-checkbox">
                <input 
                  type="checkbox" 
                  id="bilingual" 
                  ref="bilingual" 
                  onChange={this.handleCheck}
                  checked={bilingual}
                  disabled={!isEditable}
                />
                <label className="checkbox" htmlFor="bilingual">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Union:</label>
              <span className="custom-checkbox">
                <input 
                type="checkbox" 
                id="union" 
                ref="union" 
                onChange={this.handleCheck}
                checked={union}
                disabled={!isEditable}
              />
                <label className="checkbox" htmlFor="union">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <button 
                type="submit"
                onClick={this.onEdit}
                className={!isEditable ? 'btn btn-primary' : 'btn btn-hidden'} 
              >
                Edit Account Settings
              </button>
              <button 
                type="submit"
                onClick={this.onUpdateUserProfile}
                className={!isEditable ? 'btn btn-hidden' : 'btn btn-primary'} 
              >
                Update Account Settings
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  setUserProfile: bindActionCreators(setUserProfile, dispatch),
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text)),
  onSetAccountView: (view) => dispatch(setAccountView(view))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSettingsForm)