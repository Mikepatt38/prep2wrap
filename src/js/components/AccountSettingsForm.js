import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../db'

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { name, email, headline, skills, fbLink, imdbLink, error } = this.state
    const { authUser } = this.props
    api.setUserAccountSettings(authUser.uid.toString(), name, email, headline, skills, fbLink, imdbLink)
      .then( () => {
        this.setState({ username: '', email: '', headline: '', skills: '', fbLink: '', imdbLink: '', error: null })
      })
  }

  render() {
    const { authUser } = this.props
    const { name, email, headline, skills, fbLink, imdbLink, error } = this.state
    const isValid = email === '' || name === '' || headline === '' || skills === '' || fbLink === '' || imdbLink === ''

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
            disabled={isValid}
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
})

export default compose(
  connect(mapStateToProps)
)(AccountSettingsForm)