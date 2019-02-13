import React from 'react'
import PropTypes from 'prop-types'

export const FormBillingCheckbox = ({ onChange, freeTrialValue, proMembershipValue }) => {
  return (
    <div className="form-group billingCheckbox">
      <label>Select a billing plan:</label>
      <span className="custom-checkbox">
        <input 
          type="checkbox" 
          id="freeTrial" 
          onChange={onChange} 
          value={freeTrialValue} 
          checked={freeTrialValue}
        />
        <label className="checkbox xlarge spacing" htmlFor="freeTrial">Start 14 Day Free Trial</label>
      </span>

      <span className="custom-checkbox">
        <input 
          type="checkbox" 
          id="proMembership" 
          onChange={onChange} 
          value={proMembershipValue} 
          checked={proMembershipValue}
        />
        <label className="checkbox xlarge" htmlFor="proMembership">Start my Pro Membership</label>
      </span>
    </div>
  )
}
