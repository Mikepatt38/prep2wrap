import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'

export class UserProfileForm extends Component {
  state = {
    location: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.location : [],
    skills: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.skills : [],
    positions: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.positions : [],
    jobTypes: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.jobTypes : [] ,
    bilingual: this.props.currentUser.profileInformation.bilingual ? this.props.currentUser.profileInformation.bilingual : false, 
    languages: this.props.currentUser.profileInformation.languages ? this.props.currentUser.profileInformation.languages : [],
    travel: this.props.currentUser.profileInformation.travel ? this.props.currentUser.profileInformation.travel : false, 
    union: this.props.currentUser.profileInformation.union ? this.props.currentUser.profileInformation.union : false, 
    unions: this.props.currentUser.profileInformation.unions ? this.props.currentUser.profileInformation.unions : [],
    fbLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.fbLink : '',
    imdbLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.imdbLink : '',
    instagramLink: this.props.currentUser.profileInformation ? this.props.currentUser.profileInformation.instagramLink : '',
    disabled: true,
    languagesError: false,
    unionsError: false
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: false
    })
    if(e.target.name === 'unions' && this.state.unionsError) this.setState({ unionsError: false})
    if(e.target.name === 'languages' && this.state.languagesError) this.setState({ languagesError: false})
  }

  handleCheck = e => {
    this.setState({
      [e.target.id]: e.target.checked,
      disabled: false
    })
  }

  validateCheckboxInputs = () => {
    if(this.state.bilingual && !this.state.languages.length || this.state.union && !this.state.unions.length){
      if(!this.state.languages.length) this.setState({ languagesError: true })
      if(!this.state.unions.length) this.setState({ unionsError: true }) 
      return false
    }
    return true
  }

  handleClick = async (e) => {
    e.preventDefault()
    if(this.validateCheckboxInputs()){
      this.props.setUserProfile(this.props.currentUser.id, this.state.jobTypes, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.instagramLink, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages, e)
    } else {
      console.log('error')
    }
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
        <p>Update your specific job settings to ensure crew members know which jobs you're qualified for.</p>
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

        <p>Provide specific details about you to help you qualify for more jobs.</p>
        <FormCheckboxInput
          label="Willing To Travel"
          checkboxId="travel"
          onChange={this.handleCheck}
          value={travel}
          className="form-group--third"
        />
        <FormCheckboxInput
          label="Are you bilingual?"
          checkboxId="bilingual"
          onChange={this.handleCheck}
          value={bilingual}
          inputName="languages"
          inputLabel="List All Fluent Languages"
          inputValue={this.state.languages === undefined ? '' : this.state.languages}
          inputOnChange={this.handleChange}
          className="form-group--third"
          error={this.state.languagesError}
          errorMsg="If you are bilingual, you must list all fluent languages."
        />
        <FormCheckboxInput
          label="Are you a member of a union?"
          checkboxId="union"
          onChange={this.handleCheck}
          value={union}
          inputName="unions"
          inputLabel="List Union Names"
          inputValue={this.state.unions === undefined ? '' : this.state.unions}
          inputOnChange={this.handleChange}
          className="form-group--third"
          error={this.state.unionsError}
          errorMsg="If you are a union member, you must list the union name."
        />
        <hr />

        <p>Connect your social accounts to allow other crew members to find you on social media.</p>
        <FormTextInput 
          label="Facebook Profile Link"
          name="fbLink"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          placeholder="https://facebook.com/your-profile-link"
          value={fbLink}
        />
        <FormTextInput 
          label="IMDb Profile Link"
          name="imdbLink"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          placeholder="https://imdb.com/your-profile-link"
          value={imdbLink}
        />
        <FormTextInput 
          label="Instagram Profile Link"
          name="instagramLink"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          placeholder="https://instagram.com/your-profile-link"
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
    )
  }
}

export default UserProfileForm
