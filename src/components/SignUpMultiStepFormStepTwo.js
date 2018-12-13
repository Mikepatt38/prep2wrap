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
    loading: false
  }

  handleUserChange = e => {
    const newVal = e.target.value
    const name = e.target.name
    this.setState({
      [name]: newVal
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState({
      [name]: tempArr
    })
  }

  setUserProfileAndContinue = async (e) => {
    this.setState({
      loading: true
    })
    e.preventDefault()
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

  render() {
    return (
      <fieldset disabled={this.state.loading}>
        <form className="signUpForm">
          <FormTextInput 
            label="Username"
            name="username"
            type="text"
            onChange={this.handleChange}
            className="form-group--half"
            value={this.state.username}
          />
          <FormSelectInput
            label="Location"
            name="location"
            options={locationObj}
            currentSkills={this.state.location}
            placeholder="Select Cities You Work In"
            isMultiSelect={true}
            onSelect={this.handleSelect}
            className="form-group--half"
          />
          <FormSelectInput
            label="Skills"
            name="skills"
            options={skillsObj}
            currentSkills={this.state.skills}
            placeholder="Select Skills You're Qualified For"
            isMultiSelect={true}
            onSelect={this.handleSelect}
          />
          <FormSelectInput
            label="Positions"
            name="positions"
            options={positionsObj}
            currentSkills={this.state.positions}
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
            value={this.state.fbLink}
          />
          <FormTextInput 
            label="IMDb Profile Link"
            name="imdbLink"
            type="text"
            onChange={this.handleChange}
            className="form-group--half"
            value={this.state.imdbLink}
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