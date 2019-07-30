import React from 'react'
import PropTypes from 'prop-types'

const style = {
  marginBottom: '5px'
}
export const FormCheckboxInput = ({ label, checkboxId, value, disabled, onChange, inputName, inputLabel, inputValue, inputOnChange, className, customText, error, errorMsg }) => {
  return (
    <div className={`form-group ${className}`}>
      <label>{label ? label + ':' : ''}</label>
      <span className="custom-checkbox" style={style}>
        <input 
          type="checkbox" 
          id={checkboxId} 
          onChange={onChange} 
          value={value} 
          checked={value}
          disabled={disabled}
        />
        <label className="checkbox" htmlFor={checkboxId}>{customText ? customText : 'Yes'}</label>
      </span>
      { inputValue !== undefined && value === true && 
        <div className={error ? 'checkbox-input error' : 'checkbox-input'}>
          <label>{inputLabel}:</label>
          <input 
            type="text"
            name={inputName}
            id={inputName}
            value={inputValue}
            onChange={inputOnChange}
            className={error ? 'error' : null}
          />
          {error && <p id="error" className="error-message">{errorMsg}</p>}
        </div>
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