# Prep2Wrap
> A web app for the costume design industry.

## About
This is an application built for the costume design industry to allow users to create and update accounts, create, edit and delete jobs, update and maintain availability, and search and network with other users.

### Prerequisites
- [npm](https://www.npmjs.com/get-npm)
- [node](https://nodejs.org/en/download/) 

### Accounts needed:
- [Firebase](https://firebase.google.com/) - The database is managed through Firebase Firestore. Create an account and fill in the neccessary account information in the `/src/db/firebase.js` and `/functions/src/index.ts` files
- [Stripe](https://stripe.com/) - Stripe handles user subscription payments through their subscription API. Add your public key to the `StripeProvider` in the src folder and secret key to the `.env` file.
- [Twilio](https://www.twilio.com/) - Twilio is used as a messaging notification system. Add the Twilio API key to the `.env` file.
- [Sendgrid](https://sendgrid.com/) - Sendgrid is used for email notifications and managing contact with notifications from Stripe such as failed, upcoming, or completed payments. Set up the Sendgrid API key in the `.env` file.

### Development
1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install the dependencies: `npm install`
3. Start the app in the `dev` environment: `npm run start`

### Development technologies used
1. Javascript - The application is built with javascript utilizing the [React](https://reactjs.org/) library on the front end and [Node](https://nodejs.org/en/) with [Express](https://expressjs.com/) on the server.
2. State Management - The application state layer is managed using [Redux](https://redux.js.org/)
2. Styling - [SASS](https://sass-lang.com/) - The application is styled using sass. 
3. Database - [Firebase Firestore](https://firebase.google.com/docs/firestore) is used for the database and application storage

