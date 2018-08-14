import React from 'react'
import PropTypes from 'prop-types'

export const FormCheckboxInput = ({ label, checkboxId, value, disabled, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <span className="custom-checkbox">
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