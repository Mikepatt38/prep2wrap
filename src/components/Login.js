import React from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

export const Login = ({ state, handleChange, history, signUserIn, error }) => {
  return (
      <React.Fragment>
        <form
          onSubmit={(e) => signUserIn(state.email, state.password, history, e)}
        >
          <legend>Glad to see you again!</legend>
          <div className="form-link">
            New To The Calltime? &nbsp;
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
          </div>
          <FormTextInput
            label="Email"
            name="email"
            onChange={handleChange}
            type="email"
          />
          <FormTextInput
            label="password"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <FormButton
            className="btn-form"
            buttonText="Login"
          />
          {error && <p>{error.message}</p>}
        </form>
        <div className="form-footer">
          <div>
            Forgot Password? &nbsp;
            <Link to="/password-reset">
              <span>Reset Your Password</span>
            </Link>
          </div>
        </div>
      </React.Fragment>
  )
}