import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'
import { locationObj, skillsObj, positionsObj } from '../data/formOptions'

class UserProfileForm extends Component {
  state = {
    username: this.props.currentUser.username,
    location: this.props.currentUser.location,
    headline: this.props.currentUser.headline,
    skills: this.props.currentUser.skills,
    positions: this.props.currentUser.positions,
    fbLink: this.props.currentUser.fbLink,
    imdbLink: this.props.currentUser.imdbLink,
    availability: this.props.currentUser.availability,
    bilingual: this.props.currentUser.bilingual, 
    languages: this.props.currentUser.languages,
    travel: this.props.currentUser.travel, 
    union: this.props.currentUser.union, 
    unions: this.props.currentUser.unions,
  }

  buildMultiSelectState = async (valueArr) => {
    let tempArr = []
    const values = new Promise((resolve, reject) => {
      try {
        valueArr.map( value => {
          tempArr.push({
            label: value,
            value: value
          })
        })
        console.log('Resolving...')
        resolve(tempArr)
      }
      catch(error) {
        reject(error)
      }
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

  handleClick = async (e) => {
    e.preventDefault()
    this.props.setUserProfile(this.props.currentUser.id, this.state.username, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.availability, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages, e)
  }

  handleSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState({
      [name]: val,
    })
  }

  render() {
    const { currentUser } = this.props
    const { username, location, skills, positions, fbLink, imdbLink, availability, bilingual, travel, union } = this.state
    return (
      <form className="card-form-profile">
        <FormTextInput 
          label="Username"
          name="username"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={username}
        />
        <FormSelectInput
          label="Location"
          name="location"
          options={locationObj}
          currentSkills={location}
          placeholder="Select Cities You Work In"
          isMultiSelect={true}
          onSelect={this.handleSelect}
          className="form-group--half"
        />
        <FormSelectInput
          label="Skills"
          name="skills"
          options={skillsObj}
          currentSkills={skills}
          placeholder="Select Skills You're Qualified For"
          isMultiSelect={true}
          onSelect={this.handleSelect}
        />
        <FormSelectInput
          label="Positions"
          name="positions"
          options={positionsObj}
          currentSkills={positions}
          placeholder="Select Positions For Jobs You're Seeking"
          isMultiSelect={true}
          onSelect={this.handleSelect}
        />
        <FormTextInput 
          label="Facebook Profile Link"
          name="fbLink"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={fbLink}
        />
        <FormTextInput 
          label="IMDb Profile Link"
          name="imdbLink"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={imdbLink}
        />
        <FormCheckboxInput
          label="Willing To Travel"
          checkboxId="travel"
          onChange={this.handleCheck}
          value={travel}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Daily Availability"
          checkboxId="availability"
          onChange={this.handleCheck}
          value={availability}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Bilingual"
          checkboxId="bilingual"
          onChange={this.handleCheck}
          value={bilingual}
          inputName="languages"
          inputLabel="List All Fluent Languages"
          inputValue={this.state.languages === undefined ? '' : this.state.languages}
          inputOnChange={this.handleChange}
          className="form-group--half"
        />
        <FormCheckboxInput
          label="Union"
          checkboxId="union"
          onChange={this.handleCheck}
          value={union}
          inputName="unions"
          inputLabel="List Union Names"
          inputValue={this.state.unions === undefined ? '' : this.state.unions}
          inputOnChange={this.handleChange}
          className="form-group--half"
        />
        <div className="button-wrapper">
          <FormButton
            onClick={(e) => this.handleClick(e)}
            className="button-form"
            buttonText="Update Profile"
          />
        </div>
      </form>  
    )
  }
}

export default UserProfileForm
