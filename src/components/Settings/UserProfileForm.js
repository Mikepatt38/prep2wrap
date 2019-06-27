import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'

class UserProfileForm extends Component {
  state = {
    jobTypes: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.jobTypes : [] ,
    location: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.location : [],
    headline: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.headline : '',
    skills: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.skills : [],
    positions: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.positions : [],
    fbLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.fbLink : '',
    imdbLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.imdbLink : '',
    instagramLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.instagramLink : '',
    bilingual: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.bilingual : false, 
    languages: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.languages : [],
    travel: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.travel : false, 
    union: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.union : false, 
    unions: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.unions : [],
    disabled: true
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: false
    })
  }

  handleCheck = e => {
    this.setState({
      [e.target.id]: e.target.checked,
      disabled: false
    })
  }

  handleClick = async (e) => {
    e.preventDefault()
    this.props.setUserProfile(this.props.currentUser.id, this.state.jobTypes, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.instagramLink, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages, e)
  }

  handleSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState({
      [name]: val,
      disabled: false
    })
  }

  render() {
    const { jobTypes, location, skills, positions, fbLink, imdbLink, bilingual, travel, union, instagramLink } = this.state
    return (
      <div className="account-settings-profile-form">
        <div className="card">
          <div className="card-body account-settings-profile-card">
            <h4>Job Profile Settings</h4>
            <FormSelectInput
              label="Job Types"
              name="jobTypes"
              options={jobTypesObj}
              currentSkills={jobTypes}
              placeholder="Select Job types that you're qualified to work"
              isMultiSelect={true}
              onSelect={this.handleSelect}
              className="form-group--half"
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
              className="form-group--half"
            />
            <FormSelectInput
              label="Positions"
              name="positions"
              options={positionsObj}
              currentSkills={positions}
              placeholder="Select Positions For Jobs You're Seeking"
              isMultiSelect={true}
              onSelect={this.handleSelect}
              className="form-group--half"
            />

            <hr />

            <h4>Profile Specifics</h4>
            <FormCheckboxInput
              label="Willing To Travel"
              checkboxId="travel"
              onChange={this.handleCheck}
              value={travel}
              className="form-group--third"
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
              className="form-group--third"
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
              className="form-group--third"
            />

            <hr />

            <h4>Social Accounts</h4>
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
            <FormTextInput 
              label="Instagram Profile Link"
              name="instagramLink"
              type="text"
              onChange={this.handleChange}
              className="form-group--half"
              value={instagramLink}
            />

            <div className="button-wrapper">
              <FormButton
                onClick={(e) => this.handleClick(e)}
                className="button-primary"
                buttonText="Update Profile"
                disabled={this.state.disabled}
              />
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

export default UserProfileForm