import React from 'react'
import PropTypes from 'prop-types'

export const FormTextInput = ( {label, name, value, type, disabled, onChange} ) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input 
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}