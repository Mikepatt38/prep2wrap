import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Elements, StripeProvider } from 'react-stripe-elements'
import SubscriptionForm from '../Billing/SubscriptionForm'
import logo from '../../img/prep2wrap-purple-logo.png'

class SignUp extends Component {
  componentDidMount() {
    this.props.resetErrors(false, '', '')
  }

  render() {
    return (
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
              {this.props.error && <p className="error-text">{this.props.errorText}</p>}
              <StripeProvider apiKey="YOUR_STRIPE_PUBLIC_KEY">
                <Elements>
                  <SubscriptionForm
                    error={this.props.error}
                    signUpUser={this.props.signUpUser}
                    resetErrors={this.props.resetErrors}
                    history={this.props.history}
                  />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp