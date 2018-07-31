import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { setUserProfile } from '../../actions/accounts'
import { setAlert } from '../../actions/components'

const INITIAL_STATE = {
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
}

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
  }

  componentWillUnmount() {
    this.props.onSetAlert(false, '', '')
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
    const { authUser } = this.props
    const { username, location, headline, skills, fbLink, imdbLink, availability, bilingual, travel, union} = this.state
    e.preventDefault()
    this.props.setUserProfile(authUser.uid.toString(), username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual)
    this.setState({ username: '', location: '', headline: '', skills: '', fbLink: '', imdbLink: '', availability: false, bilingual: false, travel: false, union: false })
  }

  render() {
    const { username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual } = this.state
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
                <input 
                  type="checkbox" 
                  id="travel" 
                  ref="travel" 
                  onChange={this.handleCheck}
                  value={travel}
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
                  value={availability}
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
                  value={bilingual}
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
                value={union}
              />
                <label className="checkbox" htmlFor="union">Yes</label>
              </span>
            </div>
            <div className="form-group">
              <button 
                type="submit"
                onClick={this.onUpdateUserProfile}
                className={isValid ? 'btn btn-primary' : 'btn btn-disabled'} 
                disabled={!isValid}
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
})

const mapDispatchToProps = (dispatch) => ({
  setUserProfile: bindActionCreators(setUserProfile, dispatch),
  onSetAlert: (alertActive, alertType, text) => dispatch(setAlert(alertActive, alertType, text))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSettingsForm)