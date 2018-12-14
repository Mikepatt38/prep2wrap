import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import { SignUpMultiStepForm } from './SignUpMultiStepForm'

export class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { history, signUpUser, currentUser, setUserProfile } = this.props
    return (
      <div className="signUpPage fullHeight">
        <div className="signUpContainer">
          <SignUpMultiStepForm
            history={history}
            signUpUser={signUpUser}
            currentUser={currentUser}
            setUserProfile={setUserProfile}
          />
        </div>
      </div>
    )
  }
}


export const MemberLink = () => {
  return (
    <Link to="/login">
      Already a member?
    </Link>
  )
}