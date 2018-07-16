import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../db'
import { setAlert } from '../../actions/components'

class AccountSettingsForm extends Component {
  state = {
    name: '',
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

  onSubmit = e => {
    e.preventDefault()

    const { name, email, headline, skills, fbLink, imdbLink, error } = this.state
    const { authUser, onSetAlert } = this.props
    api.updateUserData(name).then( () => {
      api.setUserAccountSettings(authUser.uid.toString(), name, email, headline, skills, fbLink, imdbLink)
      .then( (string) => {
        console.log(string)
        onSetAlert(true, "success", string)
        this.setState({ username: '', email: '', headline: '', skills: '', fbLink: '', imdbLink: '', error: null })
      })
    })
  }

  render() {
    const { authUser, alertActive, alertType, alertText } = this.props
    const { name, email, headline, skills, fbLink, imdbLink, error } = this.state
    // const isValid = email === '' || name === '' || headline === '' || skills === '' || fbLink === '' || imdbLink === ''
    return (
      <form className="form-account-settings">
        <div className="grid">
          <div className="grid-row">
            <div className="grid-item">
              <div className="form-group">
              <label>Name:</label>
                <input 
                  name="name"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Name"
                  value={name}
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-group">
              <label>Email:</label>
                <input 
                  name="email"
                  onChange={this.handleChange}
                  type="text"
                  placeholder={authUser.email}
                  value={email}
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-group">
              <label>Profile Headline:</label>
                <input 
                  name="headline"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Public profile headline"
                  value={headline}
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-group">
              <label>Skills:</label>
                <input 
                  name="skills"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Type skills seperated by a comma"
                  value={skills}
                />
              </div>
            </div>
            <div className="grid-item">
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
            </div>
            <div className="grid-item">
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
            </div>
          </div>
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