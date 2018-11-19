import React from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const SignUp = ({ state, handleChange, history, signUpUser }) => {
  return (
    <form
      method="post"
      onSubmit={(e) => signUpUser(state.email, state.passwordOne, state.firstName, state.lastName, history, e)}
    >
      <FormTextInput
        label="First Name"
        name="firstName"
        onChange={handleChange}
        errorMsg="A first name is required."
        className={state.firstNameInputClass}
        type="text"
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        errorMsg="A last name is required."
        className={state.lastNameInputClass}
        type="text"
      />
      <FormTextInput
        label="Email"
        name="email"
        onChange={handleChange}
        errorMsg="Please enter your valid account email address"
        className={state.emailInputClass}
        type="email"
      />
      <FormTextInput
        label="Password"
        name="passwordOne"
        onChange={handleChange}
        errorMsg="A valid password is required."
        className={state.passwordInputClass}
        type="password"
      />
      <FormTextInput
        label="Confirm Password"
        name="passwordTwo"
        onChange={handleChange}
        type="password"
      />
      <FormButton
        className="button-form"
        buttonText="Create Account"
      />
    </form>
  )
}

export const SignUpText = () => {
  return (
    <React.Fragment>
      <h2>Create An Account</h2>
      <p>Create an account to get started.</p>
    </React.Fragment>
  )
}

export const MemberLink = () => {
  return (
    <Link to="/login">
      <a>Already a member?</a>
    </Link>
  )
}

// return (
//   <form
//     method="post"
//     onSubmit={(e) => signUpUser(state.email, state.passwordOne, state.firstName, state.lastName, history, e)}
//     style={margin}
//   >
//     <legend>Get Started Today!</legend>
//     <div className="form-link">
//       Already A Member? &nbsp;
//       <Link to="/login">
//         <span>Login</span>
//       </Link>
//     </div>
//     <FormTextInput
//       label="First Name"
//       name="firstName"
//       onChange={handleChange}
//       type="text"
//     />
//     <FormTextInput
//       label="Last Name"
//       name="lastName"
//       onChange={handleChange}
//       type="text"
//     />
//     <FormTextInput
//       label="Email"
//       name="email"
//       onChange={handleChange}
//       type="email"
//     />
//     <FormTextInput
//       label="Password"
//       name="passwordOne"
//       onChange={handleChange}
//       type="password"
//     />
//     <FormTextInput
//       label="Confirm Password"
//       name="passwordTwo"
//       onChange={handleChange}
//       type="password"
//     />
//     <FormButton
//       className="button-primary button-fullwidth"
//       buttonText="Create Account"
//     />
//     {state.error && <p>{state.error.message}</p>}
//   </form>
// )