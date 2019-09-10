import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import { CardElement, injectStripe } from 'react-stripe-elements'
import CreditCardIcon from '../../img/icon-credit-card.svg'

class UserCurrentCard extends Component {
  state = {
    updatedUserCardFormActive: false,
    card_brand: this.props.currentUser.stripe_card_brand,
    card_last4: this.props.currentUser.stripe_card_last4
  }

  handleUpdateUserCard = () => {
    console.log('clicked')
  }

  render() {
    return (
      <div className="cc-form">
        {
          this.state.updatedUserCardFormActive 
          ?
            <React.Fragment>
              <p>Add the card information that you would like to use for your monthly subscription.</p>
              <form className="cc-update-form">
                <CardElement />
                <button type="button" onClick={() => this.setState({ updatedUserCardFormActive: !this.state.updatedUserCardFormActive })} className="button-transparent">Cancel</button>
              </form>
            </React.Fragment>
          :
            <div className="cc-info">
              <p>Your current card on file. This card will be charged monthly for your subscription.</p>
              <div className="cc-wrapper">
                <div className="cc-brand">
                  <img src={CreditCardIcon} alt="Credit Card Icon" /> <p>{this.state.card_brand}</p>
                </div>
                <div className="cc-number">
                  <p><span>xxxx xxxx-</span> {this.state.card_last4}</p>
                </div>
              </div>
              <button type="button" onClick={() => this.setState({ updatedUserCardFormActive: !this.state.updatedUserCardFormActive })} className="button-transparent">Update Card on File</button>
            </div>
        }
      </div>
    )
  }
}

export default injectStripe(UserCurrentCard)

// <div className="button-wrapper">
// <FormButton
//   onClick={() => this.handleUpdateUserCard()}
//   className="button-primary"
//   buttonText="Update Card on File"
//   disabled={this.state.disabled}
// />
// </div>