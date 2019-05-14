import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Elements, StripeProvider } from 'react-stripe-elements'
import SubscriptionForm from '../Billing/SubscriptionForm'
import logo from '../../img/calltime-logo.png'

const SignUp = ({ error, errorText }) => (
  <div className="authPage">
    <div className="auth-logo">
      <img src={logo} alt="The official logo" />
    </div>
    <div className="auth-container auth-container--signup">
      <div className="auth-header">
        <h1>Create a New Account</h1>
        <p>Already have an account?</p> &nbsp;
        <Link to="/login" className="link">
          Log In
        </Link>
      </div>
      <div className="auth-card auth-card-large">
        <div className="auth-card-body">
          { error && <p className="error-text">{errorText}</p> }
          <StripeProvider apiKey="pk_test_QFA7A5tAJkV0kWHQHLJBBdHT00nh4HmiKv">
            <Elements>
              <SubscriptionForm 
                error={error}
              />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    </div>
  </div>
)

export default SignUp