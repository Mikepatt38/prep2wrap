import React, { Component, Fragment } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'

const skillsObj = [
  { value: 'made to order', label: 'Made To Order' },
  { value: 'Dress BG', label: 'Dress BG' },
  { value: 'Fit periocc', label: 'Fit periocc' },
  { value: 'Shop', label: 'Shop' },
  { value: 'Fit', label: 'Fit' },
  { value: 'Returns', label: 'Returns' },
  { value: 'Pull Stock', label: 'Pull Stock' },
  { value: 'Aging/ Blood Work', label: 'Aging/ Blood Work' },
  { value: 'Basic Sewing', label: 'Basic Sewing' },
  { value: 'Advance Sewing', label: 'Advance Sewing' },
  { value: 'Pattern Cutting & Draping', label: 'Pattern Cutting & Draping' },
  { value: 'Mens Tailoring', label: 'Mens Tailoring' },
  { value: 'Water Work', label: 'Water Work' },
  { value: 'Stunt Work', label: 'Stunt Work' },
  { value: 'Fire Work', label: 'Fire Work' },
  { value: 'Track Continuity', label: 'Track Continuity' },
  { value: 'Night Shoots', label: 'Night Shoots' },
  { value: 'Wrap Shows', label: 'Wrap Shows' },
  { value: 'Military/ Uniform', label: 'Military/ Uniform' },
  { value: 'Fabric Sourcing', label: 'Fabric Sourcing' }
]

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

  handleSelect = (val) => {
    this.setState({
      skills: val
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
        <FormSelectInput
          label="Skills"
          options={skillsObj}
          currentSkills={currentUser.skills}
          onSelect={this.handleSelect}
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
        <p>{currentUser.skills.map( (skill, key) => {
          return key ===  (currentUser.skills.length -1) ? skill.value : skill.value + ', '
        })}</p>
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