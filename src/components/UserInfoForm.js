import React, { Component, Fragment } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'

class UserInfoForm extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    const { firstName, lastName, email } = this.state
    const { setName, setEmail } = this.props
    
    return (
      <Fragment>
        { setName !== null && 
          <form
            method="form"
            className="form-account-body--general"
          >
            <FormTextInput
              label="First Name"
              name="firstName"
              type="text"
              onChange={this.handleChange}
              value={firstName}
            />
            <FormTextInput
              label="Last Name"
              name="lastName"
              type="text"
              onChange={this.handleChange}
              value={lastName}
            />
            <FormButton
              onClick={(e) => setName(this.props.currentUser.id, firstName, lastName, e)}
              className="button-primary"
              buttonText="Update Name"
            />
          </form>   
        } 
        { setEmail !== null &&
          <form
            onSubmit={setEmail}
            className="form-account-body--general"
          >
            <FormTextInput
              label="email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={email}
            />
            <FormButton
              onClick={(e) => setEmail(this.props.currentUser.id, email, e)}
              className="button-primary"
              buttonText="Update Email"
            />
          </form>
        }
      </Fragment>
    )
  }
}

export default UserInfoForm