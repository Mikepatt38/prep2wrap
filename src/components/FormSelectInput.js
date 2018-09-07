import React, { Component } from 'react'
import Select from 'react-select' 

class FormSelectInput extends Component {
  render() {
    const { options, className, label } = this.props
    return (
      <div className={'form-group' + ` ${className}`}>
        <label>{label}:</label>
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={options}
        />
      </div>
    )
  }
}

export default FormSelectInput