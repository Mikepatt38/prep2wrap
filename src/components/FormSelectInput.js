import React, { Component } from 'react'
import Select from 'react-select' 

class FormSelectInput extends Component {
  state = {
    selectedOption: this.props.currentSkills
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      this.props.onSelect(this.props.name, this.state.selectedOption)
    })
  }

  render() {
    const { options, className, label, placeholder, isMultiSelect } = this.props
    return (
      <div className={'form-group' + ` ${className}`}>
        <label>{label}:</label>
        <Select
          closeMenuOnSelect={!isMultiSelect}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          defaultValue={this.state.selectedOption}
          isMulti={isMultiSelect}
          options={options}
          placeholder={placeholder}
        />
      </div>
    )
  }
}

export default FormSelectInput