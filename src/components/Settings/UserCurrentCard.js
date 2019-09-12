import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import { Elements, StripeProvider} from 'react-stripe-elements'
import CreditCardIcon from '../../img/icon-credit-card.svg'
import LoadingModal from '../General/LoadingModal'
import UserUpdateCardForm from './UserUpdateCardForm'

class UserCurrentCard extends Component {
  state = {
    loading: false,
    updatedUserCardFormActive: false,
    card_brand: this.props.currentUser.stripe_card_brand,
    card_last4: this.props.currentUser.stripe_card_last4
  }

  componentDidUpdate = (prevProps) => { 
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({
        card_brand: this.props.currentUser.stripe_card_brand,
        card_last4: this.props.currentUser.stripe_card_last4
      })
    }
  }

  toggleLoading = (active) => {
    this.setState({
      loading: active
    })
  }

  updateCardError = () => {
    this.setState({
      formError: true
    })
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_QFA7A5tAJkV0kWHQHLJBBdHT00nh4HmiKv">
        <Elements>
          <div className="cc-form">
            {
              this.state.updatedUserCardFormActive 
              ?
                <React.Fragment>
                  <UserUpdateCardForm 
                    currentUser={this.props.currentUser}
                    toggleLoading={this.toggleLoading}
                    updateUserCardInfo={this.props.updateUserCardInfo}
                    updateCardError={this.updateCardError}
                    toggleForm={() => this.setState({ updatedUserCardFormActive: false})}
                  />
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
                  <button type="button" onClick={() => this.setState({ updatedUserCardFormActive: !this.state.updatedUserCardFormActive })} className="button-link">Update Card on File</button>
                </div>
            }
          </div>
        </Elements>
      </StripeProvider>
    )
  }
}

export default UserCurrentCard
