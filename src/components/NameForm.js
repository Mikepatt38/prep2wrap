import React, { Fragment, Component  } from 'react'
import { FormTextInput } from './FormTextInput'
import { FormButton } from './FormButton'
import SaveIcon from '../img/icon-save.svg'
import CancelIcon from '../img/icon-close.svg'

export class InlineForm extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form 
        method="form"
        className="form-inline"
      >
        <div className="form-group">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div className="form-group">
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <button className="button-inline"><img src={SaveIcon} /></button>
        <button className="button-inline button-cancel"><img src={CancelIcon} /></button>
      </form>
    )
  }
}

export const NameForm = ({state, id, setName, handleChange}) => {
  return (
    <form
      method="form"
      className="form-account-body--general"
    >
      <FormTextInput
        label="First Name"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={state.firstName}
      />
      <FormTextInput
        label="Last Name"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={state.lastName}
      />
      <FormButton
        onClick={(e) => setName(id, state.firstName, state.lastName, e)}
        className="button-primary"
        buttonText="Update Name"
      />
    </form>
  )
}