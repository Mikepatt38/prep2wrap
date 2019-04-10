import React from 'react'
import PropTypes from 'prop-types'

export const FormButton = ( { className, onClick, buttonText, disabled } ) => {
  return (
    <button 
      type="submit"
      className={className}
      onClick={onClick}
      disabled={disabled && disabled}
    > 
      {buttonText} 
    </button>
  )
} 

FormButton.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
}