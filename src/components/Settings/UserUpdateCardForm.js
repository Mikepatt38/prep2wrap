import React, { Component } from 'react'
import { FormButton } from '../Forms/FormButton'
import { CardElement, injectStripe} from 'react-stripe-elements'

class UserUpdateCardForm extends Component {

  handleUpdateUserCard = async (e) => {
    e.preventDefault()

    // create a Stripe source for the new credit card
    let source 
    source = await this.props.stripe.createSource({ type: 'card',
      owner: {
        name: `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`,
        email: `${this.props.currentUser.email}`,
        phone: `${this.props.currentUser.mobileNumber}`
      }
    })

    if(source){

      const cardInfo = {
        brand: source.source.card.brand,
        last4: source.source.card.last4
      }

      const postBody = {
        userName: `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`,
        userEmail: `${this.props.currentUser.email}`,
        stripeSourceId: source.source.id,
        customer_id: `${this.props.currentUser.stripe_id}`
      }

      // We need to send the source to the endpoint that allows us to update the user card source on the server with Stripe
      let response = await fetch("/update-user-source", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        // dataType: "json",
        body: JSON.stringify(postBody)
      }) 
      // Getting the Customer ID back from the server
      let serverResponse = await response.status
      if(serverResponse === 200){
        this.props.updateUserCardInfo(this.props.currentUser.id, cardInfo)
      }
      else {
        this.props.updateCardError()
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <p>Add the card information that you would like to use for your monthly subscription.</p>
        <form className="cc-update-form">
          <CardElement />
          <div className="button-wrapper">
            <button type="button" onClick={() => this.props.toggleForm()} className="button-transparent">Cancel</button>
            <FormButton
              onClick={(e) => this.handleUpdateUserCard(e)}
              className="button-primary"
              buttonText="Update Card Information"
            />
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default injectStripe(UserUpdateCardForm)