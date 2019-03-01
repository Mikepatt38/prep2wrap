import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormCheckboxInput } from '../Forms/FormCheckboxInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'

export class SignUpMultiStepFormStepTwo extends Component {
  state = {
    jobTypes: '',
    location: '',
    skills: '',
    positions: '',
    fbLink: '',
    imdbLink: '',
    availability: false,
    bilingual: false, 
    languages: '',
    travel: false, 
    union: false, 
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
      [name]: val,
      [name+'Error']: false
    })
  }

  validateForm = () => {
    let validated = true
    const requiredFormFields = [this.state.jobTypes, this.state.location, this.state.skills, this.state.positions, this.state.imdbLink ]
    requiredFormFields.map( value => {
      if (value.length === 0 ) {
        console.log(value)
        console.log(this.state[value].length)
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
        console.log("Form validated")
        this.props.setUserProfile(this.props.currentUser.id, this.state.jobTypes, this.state.location, this.state.skills, this.state.positions, this.state.fbLink, this.state.imdbLink, this.state.availability, this.state.travel, this.state.union, this.state.bilingual, this.state.unions, this.state.languages)
        .then( result => {
          result === 'success' 
          ?
            this.setState({ 
              loading: false
            },
            () => {
              console.log('Form submitted')
              this.props.saveAndContinue(e) 
            })
          : this.props.errorAndStop(e)
        })
      }
      else {
        console.log('Form not validated')
        this.setState({ loading: false })
      }
    })
  }


  render() {
    return (
      <div className="auth-card auth-card-large">
        <div className="auth-card-header">
          <h3>Step 2/3: Set up your profile.</h3>
          <p>Second, we'll learn a little more about what you do, how you do, and where you do it at to build your profile.</p>     
        </div>
        <div className="auth-card-body">
          <fieldset disabled={this.state.loading}>
            <form className="signUpForm">
              <FormSelectInput
                label="Job Types"
                name="jobTypes"
                className="form-group--half"
                placeholder="Select Job types that you're qualified to work"
                isMultiSelect={true}
                options={jobTypesObj}
                currentSkills={this.state.jobTypes}
                onSelect={this.handleSelect}
                error={this.state.skillsError}
                errorMsg="Select at least one skill."
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
                placeholder="Ex: https://facebook.com/your-facebook-link"
                onChange={this.handleChange}
                value={this.state.fbLink}
              />
              <FormTextInput 
                label="IMDb Profile Link"
                name="imdbLink"
                type="text"
                className="form-group--half"
                placeholder="Ex: https://imdb.com/your-imdb-link"
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
        </div>
      </div>
    )
  }

}