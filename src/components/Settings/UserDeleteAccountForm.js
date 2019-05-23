import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'

class DeleteUserAccountForm extends Component {

  handleDelete(e){
    e.preventDefault()
    this.props.setModal(true, "Delete your account.", 
      <DeleteUserAccountModal 
        deleteUserAccount={this.props.deleteUserAccount}
        history={this.props.history}
        closeModal={this.props.closeModal}
      />   
    )
  }
  render() {
    return (
      <div className="card">
        <p>this allows the user to delete their account!</p>
        <button 
          className="button button-danger"
          onClick={(e) => this.handleDelete(e)}
        >Delete Account</button>
      </div>
    )
  }
}

export default DeleteUserAccountForm

export class DeleteUserAccountModal extends Component {
  state = {
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.setState({ password: '' })
    this.props.closeModal(false)
  }

  handleDeleteUserAccount = async (e) => {
    e.preventDefault()
    this.props.deleteUserAccount(this.state.password, this.props.history)
  } 

  render(){
    return (
      <div className="modal">
        <div className="modal-body">
          <p className="modal-text-warning">To confirm the deletion of your account please provide your password. Once you delete your account all account information and data will be deleted. <b>Your membership to Crew It Up will be canceled.</b></p>
          <form className="modal-form">
            <div className="input-group">
              <FormTextInput
                name="password"
                label="Password"
                placeholder="password"
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
              />
              <div className="modal-button-wrapper">
              <FormButton
                className="button-transparent"
                buttonText="Cancel"
                onClick={(e) => this.handleCancel(e)}
              />
              <FormButton
                className="button-danger"
                buttonText="Delete My Account"
                onClick={(e) => this.handleDeleteUserAccount(e)}
              />
            </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

