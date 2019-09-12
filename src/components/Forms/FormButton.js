import React from 'react'

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