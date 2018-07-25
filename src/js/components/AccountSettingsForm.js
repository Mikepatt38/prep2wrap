import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../db'
import { setAlert } from '../../actions/components'

class AccountSettingsForm extends Component {
  state = {
    username: '',
    location: '',
    firstName: '',
    lastName: '',
    email: '',
    headline: '',
    skills: '',
    fbLink: '',
    imdbLink: '',
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
    const { firstName, lastName, email, username, location, headline, skills, fbLink, imdbLink, error } = this.state
    // const isValid = email === '' || name === '' || headline === '' || skills === '' || fbLink === '' || imdbLink === ''
    return (
      <React.Fragment>
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
                  type="text" 
                  placeholder="Michael" 
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input 
                  type="text" 
                  placeholder="Patterson" 
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
                  type="email" 
                  placeholder="michael@outlyrs.com" 
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
)(AccountSettingsForm)