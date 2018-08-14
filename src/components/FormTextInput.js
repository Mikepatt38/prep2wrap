import React from 'react'
import PropTypes from 'prop-types'

export const FormTextInput = ( {label, name, value, type, disabled, placeholder, onChange} ) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input 
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  )
}

FormTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}