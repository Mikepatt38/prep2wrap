import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import DownArrowIcon from '../../img/icon-down-arrow.svg'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'

export class UserSearchForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    positions: [],
    location: [],
    skills: [],
    jobTypes: []
  }

  handleChange = (e) => {
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
      [name]: val,
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.searchUsersByName(this.state.firstName, this.state.lastName)
    this.setState({
      firstName: '',
      lastName: ''
    })
  }

  handleAdditionalFilters = () => {
    const element = document.getElementById('extra-filters')
    element.classList.contains('open') ? element.classList.remove('open') : element.classList.add('open')

  }

  render() {
    const { firstName, lastName, positions, location, skills, jobTypes  } = this.state

    return (
      <form
        method="form"
        className="card-form"
      >
        <FormTextInput 
          label="First Name"
          name="firstName"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={firstName}
        />
        <FormTextInput 
          label="Last Name"
          name="lastName"
          type="text"
          onChange={this.handleChange}
          className="form-group--half"
          value={lastName}
        />
        <div className="form-additional" id="extra-filters">
          <span onClick={this.handleAdditionalFilters}>Additional Filters <img src={DownArrowIcon} alt="Down Arrow Icon" /></span>
          <div className="form-additional-filters">
            <FormSelectInput
              label="Positions"
              name="positions"
              options={positionsObj}
              currentSkills={positions}
              placeholder="Select a Position to filter users by"
              isMultiSelect={true}
              className="form-group--half"
              onSelect={this.handleSelect}
            />
            <FormSelectInput
              label="Location"
              name="location"
              options={locationObj}
              currentSkills={location}
              placeholder="Select a location"
              isMultiSelect={false}
              className="form-group--half"
              onSelect={this.handleSelect}
            />
            <FormSelectInput
              label="Skills"
              name="skills"
              options={skillsObj}
              currentSkills={skills}
              placeholder="Select skills to filter by"
              isMultiSelect={true}
              className="form-group--half"
              onSelect={this.handleSelect}
            />
            <FormSelectInput
              label="Job Types"
              name="jobType"
              options={jobTypesObj}
              currentSkills={jobTypes}
              placeholder="Select Job Types User Specializes"
              isMultiSelect={true}
              className="form-group--half"
              onSelect={this.handleSelect}
            />
          </div>
        </div>
        <div className="button-wrapper">
          <FormButton
            onClick={(e) => this.handleClick(e)}
            className="button-primary"
            buttonText="Search"
          />
        </div>
      </form>
    )
  }
}