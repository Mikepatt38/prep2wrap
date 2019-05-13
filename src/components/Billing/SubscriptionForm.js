import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

const SubscriptionForm = (props) => {
  async function submit(ev) {
    ev.preventDefault()
    // Call function in backend to create the user with the given email
    // And we create the source to also connect it to the created user
    // To subscribe them to the plan

    // Creating the source
    let source
    // source = await props.stripe.createSource(token, { type: 'card', name: props.userName, email: props.userEmail })
    source = await props.stripe.createSource({ type: 'card', owner: { name: props.userName } });
    // If we get the source then we send that and the email to the server to create
    // the user and subscribe them to the subscription
    if(source){
      const postBody = {
        userEmail: props.userEmail,
        stripeSourceId: source.source.id
      }
      console.log(postBody)
      // We send this info to the server to create with Stripe
      let response = await fetch("http://localhost:9000/create-user-subscription", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        // dataType: "json",
        body: JSON.stringify(postBody)
      }) 
      let jsonResponse = await response.json()
      let responseObj = await JSON.stringify(jsonResponse)
      console.log(responseObj)
    }
    else{
      console.log('No source was created')
    }
  }
  




    // // Create the customer with Stripe, get a callback for the customer from Stripe
    // const customer = await props.stripe.customers.create({email: props.userEmail});
    // // Send the customer to the sign up component so the customer id can be saved for the stripe id
    // props.setUserStripeID(customer.id)
    // // We need to create the source for the subscription payment so the customer can be added
    // let source
    // // Creating the source
    // source = await props.stripe.createSource()
    // // If we get a source back, we need to post it to link the customer in the backend
    // if (source) {
    //   const postBody = {
    //     stripeSourceId: source.source.id,
    //     customerId: customer.id,
    //     paymentMedium: 'card',
    //   }
    //   let response = await fetch("http://localhost:9000/create-user-subscription", {
    //     method: "POST",
    //     headers: {"Content-Type": "text/plain"},
    //     body: postBody
    //   })

    //   if(response.ok){
    //     const subscription = await props.stripe.subscriptions.create({
    //       customer: customer.id,
    //       items: [{ plan: 'prod_F227vSQ8CwdRuH' }],
    //     })
    //     if(subscription){
    //       console.log('User was subscribed!')
    //     }
    //     else{
    //       console.log('User was not subscribed')
    //     }

    //   }
    //   else{
    //     console.log("There was an error adding your subscription.")
    //   }
    // }

  return (
    <div className="checkout">
      <label>Start your 14 day free trial:</label>
      <CardElement />
      <button onClick={(e) => submit(e)}>Send</button>
    </div>
  );
}

export default injectStripe(SubscriptionForm)