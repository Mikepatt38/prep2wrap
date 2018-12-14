import React, { Component } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormCheckboxInput } from './FormCheckboxInput'
import FormSelectInput from './FormSelectInput'
import { FormButton } from './FormButton'
import { locationObj, skillsObj, positionsObj } from '../data/formOptions'

export class SignUpMultiStepFormStepTwo extends Component {
  state = {
    username: '',
    location: '',
    headline: '',
    skills: '',
    positions: '',
    fbLink: '',
    imdbLink: '',
    availability: '',
    bilingual: '', 
    languages: '',
    travel: '', 
    union: '', 
    unions: '',
    loading: false,
    validated: true
  }

  handleUserChange = e => {
    const newVal = e.target.value
    const name = e.target.name
    this.setState({
      [name]: newVal,
      [e.target.name+'Error']: false
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name+'Error']: false
    })
  }

  handleCheck = e => {
    const newVal = e.target.checked
    const name = e.target.id
    this.setState({
      [name]: newVal,
      [e.target.name+'Error']: false
    })
  }

  handleSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState({
      [name]: tempArr,
      [name+'Error']: false
    })
  }

  validateForm = () => {
    let validated = true
    Object.keys(this.state).map( value => {
      if (this.state[value].length === 0 ) {
        validated = false
        this.setState({
          [value+'Error']: true
        })
      }
    })
    return validated
  }

  setUserProfileAndContinue = async (e) => {
    e.preventDefault()
    this.setState({
      loading: true
    }, () => {
      if(this.validateForm()) {
        this.props.setUserProfile(this.props.currentUser.id, this.state.username, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.availability, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages)
        .then( result => {
          result === 'success' 
          ?
            this.setState({ 
              loading: false
            },
            () => {
              this.props.saveAndContinue(e) 
            })
          : this.props.errorAndStop(e)
        })
      }
      else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <fieldset disabled={this.state.loading}>
        <form className="signUpForm">
          <h2 className="signUpFormTitle">Set up your profile information.</h2>
          <FormTextInput 
            label="Username"
            type="text"
            name="username"
            className="form-group--half"
            onChange={this.handleChange}
            value={this.state.username}
            error={this.state.usernameError}
            errorMsg="A username is required."
          />
          <FormSelectInput
            label="Location"
            name="location"
            className="form-group--half"
            placeholder="Select Cities You Work In"
            isMultiSelect={true}
            options={locationObj}
            currentSkills={this.state.location}
            onSelect={this.handleSelect}
            error={this.state.locationError}
            errorMsg="Select at least one location."
          />
          <FormSelectInput
            label="Skills"
            name="skills"
            placeholder="Select Skills You're Qualified For"
            isMultiSelect={true}
            options={skillsObj}
            currentSkills={this.state.skills}
            onSelect={this.handleSelect}
            error={this.state.skillsError}
            errorMsg="Select at least one skill."
          />
          <FormSelectInput
            label="Positions"
            name="positions"
            placeholder="Select Positions For Jobs You're Seeking"
            isMultiSelect={true}
            options={positionsObj}
            currentSkills={this.state.positions}
            onSelect={this.handleSelect}
            error={this.state.positionsError}
            errorMsg="Select at least one position."
          />
          <FormTextInput 
            label="Facebook Profile Link"
            name="fbLink"
            type="text"
            className="form-group--half"
            onChange={this.handleChange}
            value={this.state.fbLink}
          />
          <FormTextInput 
            label="IMDb Profile Link"
            name="imdbLink"
            type="text"
            className="form-group--half"
            onChange={this.handleChange}
            value={this.state.imdbLink}
            error={this.state.imdbLinkError}
            errorMsg="Provide a valid profile link."
          />
          <FormCheckboxInput
            label="Willing To Travel"
            checkboxId="travel"
            onChange={this.handleCheck}
            value={this.state.travel}
            className="form-group--half"
          />
          <FormCheckboxInput
            label="Daily Availability"
            checkboxId="availability"
            onChange={this.handleCheck}
            value={this.state.availability}
            className="form-group--half"
          />
          <FormCheckboxInput
            label="Bilingual"
            checkboxId="bilingual"
            onChange={this.handleCheck}
            value={this.state.bilingual}
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
            value={this.state.union}
            inputName="unions"
            inputLabel="List Union Names"
            inputValue={this.state.unions === undefined ? '' : this.state.unions}
            inputOnChange={this.handleChange}
            className="form-group--half"
          />
          <div className="button-right">
            <FormButton
              onClick={this.setUserProfileAndContinue}
              className="button-form"
              buttonText="Next"
            />
          </div>
        </form>  
      </fieldset>
    )
  }

}