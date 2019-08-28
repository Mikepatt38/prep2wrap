import React from 'react'
import PropTypes from 'prop-types'

export const FormTextInput = ( {label, name, autocomplete, value, type, disabled, placeholder, onChange, className, errorMsg, error} ) => {
  return (
    <div className={error ? 'field-error form-group' + ` ${className}` : 'form-group' + ` ${className}` }>
      <label>{label}</label>
      <input 
        name={name}
        onChange={onChange}
        autoComplete={autocomplete}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      <p className="error-msg">{errorMsg}</p>
    </div>
  )
}

FormTextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}