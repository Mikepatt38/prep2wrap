import React, { Component } from 'react'
import Select from 'react-select' 

class FormSelectInput extends Component {
  state = {
    selectedOption: this.props.currentSkills
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      this.props.onSelect(this.state.selectedOption)
    })
  }

  render() {
    const { options, className, label } = this.props
    return (
      <div className={'form-group' + ` ${className}`}>
        <label>{label}:</label>
        <Select
          closeMenuOnSelect={false}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          defaultValue={this.state.selectedOption}
          isMulti
          options={options}
          placeholder="Select Skills You're Qualified For"
        />
      </div>
    )
  }
}

export default FormSelectInput