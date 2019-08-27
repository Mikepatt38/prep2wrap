import React, { Component } from 'react'
import Select from 'react-select' 

class FormSelectInput extends Component {
  state = {
    selectedOption: this.props.currentValues
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.currentValues !== this.props.currentValues){
      this.setState({
        selectedOption: this.props.currentValues
      })
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      this.props.onSelect(this.props.name, this.state.selectedOption)
    })
  }

  render() {
    const { options, className, label, placeholder, isMultiSelect, error, errorMsg, isClearable } = this.props
    return (
      <div className={error === true ? 'field-error form-group' + ` ${className}` : 'form-group' + ` ${className}` }>
        <label>{label}</label>
        <Select
          closeMenuOnSelect={!isMultiSelect}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          defaultValue={this.state.selectedOption}
          isMulti={isMultiSelect}
          options={options}
          placeholder={placeholder}
          hideSelectedOptions={false}
          isSearchable={false}
          isClearable={isClearable === false ? isClearable : true}
        />
        <p className="error-msg">{errorMsg}</p>
      </div>
    )
  }
}

export default FormSelectInput