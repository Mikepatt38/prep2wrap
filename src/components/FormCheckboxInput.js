import React from 'react'
import PropTypes from 'prop-types'

const style = {
  marginBottom: '5px'
}
export const FormCheckboxInput = ({ label, checkboxId, value, disabled, onChange, inputName, inputLabel, inputValue, inputOnChange }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <span className="custom-checkbox" style={style}>
        <input 
          type="checkbox" 
          id={checkboxId} 
          onChange={onChange} 
          value={value} 
          checked={value}
          disabled={disabled}
        />
        <label className="checkbox" htmlFor={checkboxId}>Yes</label>
      </span>
      { inputValue !== undefined && value === true && 
        <React.Fragment>
          <label>{inputLabel}:</label>
          <input 
            type="text"
            name={inputName}
            id={inputName}
            value={inputValue}
            onChange={inputOnChange}
          />
        </React.Fragment>
      }
    </div>
  )
}

FormCheckboxInput.propTypes = {
  label: PropTypes.string,
  checkboxId: PropTypes.string,
  handleCheck: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.bool
}