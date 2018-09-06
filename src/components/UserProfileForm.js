import React, { Component, Fragment } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import { FormButton } from './FormButton'

class UserProfileForm extends Component {
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

  render() {
    const { currentUser, setUserProfile } = this.props
    const { username, location, headline, skills, fbLink, imdbLink, availability, bilingual, travel, union } = this.state
    return (
      <form className="form-account-body--profile">
        <FormTextInput 
          label="Username"
          name="username"
          type="text"
          onChange={this.handleChange}
          value={username}
        />
        <FormTextInput 
          label="Location"
          name="location"
          type="text"
          onChange={this.handleChange}
          value={location}
        />
        <FormTextInput 
          label="Skills"
          name="skills"
          type="text"
          onChange={this.handleChange}
          value={skills}
          placeholder="Type Skills seperated by a comma"
        />
        <FormTextInput 
          label="Facebook Profile Link"
          name="fbLink"
          type="text"
          onChange={this.handleChange}
          value={fbLink}
        />
        <FormTextInput 
          label="IMDb Profile Link"
          name="imdbLink"
          type="text"
          onChange={this.handleChange}
          value={imdbLink}
        />
        <FormCheckboxInput
          label="Willing To Travel"
          checkboxId="travel"
          onChange={this.handleCheck}
          value={travel}
        />
        <FormCheckboxInput
          label="Daily Availability"
          checkboxId="availability"
          onChange={this.handleCheck}
          value={availability}
        />
        <FormCheckboxInput
          label="Bilingual"
          checkboxId="bilingual"
          onChange={this.handleCheck}
          value={bilingual}
        />
        <FormCheckboxInput
          label="Union"
          checkboxId="union"
          onChange={this.handleCheck}
          value={union}
        />
        <FormButton
          onClick={(e) => setUserProfile(currentUser.id, username, location, headline, skills, fbLink, imdbLink, availability, travel, union, bilingual, e)}
          className="button-primary"
          buttonText="Update User Profile"
        />
      </form>  
    )
  }
}

export const ProfileDisplayed = ({ currentUser }) => {
  return (
    <Fragment>
      <div className="card-item">
        <label>Username: </label>
        <p> {currentUser.username}</p>
      </div>
      <div className="card-item">
        <label>Location: </label>
        <p> {currentUser.location}</p>
      </div>
      <div className="card-item">
        <label>Skills: </label>
        <p> {currentUser.skills}</p>
      </div>
      <div className="card-item">
        <label>Facebook Link: </label>
        <p> {currentUser.fbLink}</p>
      </div>
      <div className="card-item">
        <label>IMDB Link: </label>
        <p> {currentUser.imdbLink}</p>
      </div>
      <div className="card-item">
        <label>Willing To Travel: </label>
        <p> {currentUser.travel ? 'True' : 'False'}</p>
      </div>
      <div className="card-item">
        <label>Daily Availability: </label>
        <p> {currentUser.availability ? 'True' : 'False'}</p>
      </div>
      <div className="card-item">
        <label>Bilingual: </label>
        <p> {currentUser.bilingual ? 'True' : 'False'}</p>
      </div>
      <div className="card-item">
        <label>Apart of A Union: </label>
        <p> {currentUser.union ? 'True' : 'False'}</p>
      </div>
    </Fragment>
  )
}

export default UserProfileForm