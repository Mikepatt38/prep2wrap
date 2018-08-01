import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserProfile } from '../../actions/accounts'
import { setAlert } from '../../actions/components'

class ProfileSettingsForm extends Component {
  state = {
    username: this.props.currentUser.username,
    location: this.props.currentUser.location,
    headline: this.props.currentUser.headline,
    skills: this.props.currentUser.skills,
    fbLink: this.props.currentUser.fbLink,
    imdbLink: this.props.currentUser.imdbLink,
    availability: this.props.currentUser.availability,
    bilingual: this.props.currentUser.bilingual,
    travel: this.props.currentUser.travel,
    union: this.props.currentUser.union,
    isEditable: false
  }

  componentWillUnmount() {
    this.props.onSetAlert(false, '', '')
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
    this.setState({
      [e.target.id]: e.target.checked
    })
  }

  onUpdateUserProfile = e => {
    const { currentUser } = this.props
    const { username, location, headline, skills, fbLink, imdbLink, availability, bilingual, travel, union} = this.state
    e.preventDefault()
    this.props.setUserProfile(currentUser.id, username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual)
    // this.setState({ username: '', location: '', headline: '', skills: '', fbLink: '', imdbLink: '', availability: false, bilingual: false, travel: false, union: false })
  }

  render() {
    const { username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual, isEditable } = this.state
    const isValid = username !== '' || location !== '' || headline !== '' || skills !== '' || fbLink !== '' || imdbLink !== '' || availability === true || travel === true || union === true || bilingual === true
    return (
      <React.Fragment>
        <div className="grid-account-body grid-account-body--profile">
          <div className="grid-account-body--header">
            {/* <h3>Profile Settings</h3> */}
            <p>This is your public profile information, it can be updated at any time.</p>            
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
                  vcheckedalue={bilingual}
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
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSettingsForm)