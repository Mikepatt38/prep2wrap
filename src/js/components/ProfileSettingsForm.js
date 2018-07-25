import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../db'
import { setAlert } from '../../actions/components'

class ProfileSettingsForm extends Component {
  state = {
    username: '',
    location: '',
    headline: '',
    skills: '',
    fbLink: '',
    imdbLink: '',
    availability: false,
    bilingual: false,
    travel: false,
    union: false,
    error: null
  }

  componentWillUnmount() {
    this.props.onSetAlert(false, '', '')
 }

  onSubmit = e => {
    e.preventDefault()

    const { firstName, lastName, email, headline, skills, fbLink, imdbLink, error } = this.state
    const { authUser, onSetAlert } = this.props
    api.updateUserData(firstName, lastName).then( () => {
      api.setUserAccountSettings(authUser.uid.toString(), firstName, lastName, email, headline, skills, fbLink, imdbLink)
      .then( (string) => {
        console.log(string)
        onSetAlert(true, "success", string)
        this.setState({ firstName: '', lastName: '', email: '', headline: '', skills: '', fbLink: '', imdbLink: '', error: null })
      })
    })
  }

  render() {
    const { authUser, alertActive, alertType, alertText } = this.props
    const { username, location, headline, skills, fbLink, imdbLink, error } = this.state
    // const isValid = email === '' || name === '' || headline === '' || skills === '' || fbLink === '' || imdbLink === ''
    return (
      <React.Fragment>
        <div className="grid-account-body grid-account-body--profile">
          <div className="grid-account-body--header">
            <h3>Profile Settings</h3>
            <p>This is your public profile information, it can be updated at any time.</p>            
          </div>
          <form className="form-account-body--profile">
            <div className="form-group">
              <label>Username:</label>
              <input 
                name="username"
                onChange={this.handleChange}
                type="text"
                placeholder="Michael Patterson"
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input 
                name="location"
                onChange={this.handleChange}
                type="text"
                placeholder="Your City"
                value={location}
              />
            </div>
            <div className="form-group form-group--fullWidth">
              <label>Profile Headline:</label>
              <input 
                name="headline"
                onChange={this.handleChange}
                type="text"
                placeholder="Public profile headline"
                value={headline}
              />
            </div>
            <div className="form-group form-group--fullWidth">
              <label>Skills:</label>
              <input 
                name="skills"
                onChange={this.handleChange}
                type="text"
                placeholder="Type skills seperated by a comma"
                value={skills}
              />
            </div>
            <div className="form-group">
              <label>FB Link:</label>
              <input 
                name="fbLink"
                onChange={this.handleChange}
                type="text"
                placeholder="Facebook Profile Link"
                value={fbLink}
              />
            </div>
            <div className="form-group">
              <label>IMDb Link:</label>
              <input 
                name="imdbLink"
                onChange={this.handleChange}
                type="text"
                placeholder="IMDb Profile Link"
                value={imdbLink}
              />
            </div>  
            <div className="form-group">
              <label>Willing To Travel:</label>
              <span className="custom-checkbox">
                <input type="checkbox" id="travel" />
                <label className="checkbox" for="travel">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Daily Availability:</label>
              <span className="custom-checkbox">
                <input type="checkbox" id="availability" />
                <label className="checkbox" for="availability">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Bilingual:</label>
              <span className="custom-checkbox">
                <input type="checkbox" id="bilingual" />
                <label className="checkbox" for="bilingual">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <label>Union:</label>
              <span className="custom-checkbox">
                <input type="checkbox" id="union" />
                <label className="checkbox" for="union">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <button 
                type="submit"
                onClick={this.onSubmit}
                className="btn-primary" 
                // disabled={isValid}
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
)(ProfileSettingsForm)