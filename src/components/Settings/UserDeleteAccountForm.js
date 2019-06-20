import React, { Component } from 'react'
import { FormTextInput } from '../Forms/FormTextInput'
import { FormButton } from '../Forms/FormButton'
import Modal from '../General/Modal'

class DeleteUserAccountForm extends Component {

  state = {
    modalActive: false
  }
  
  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          active={this.state.modalActive}
          title="Delete your account"
          children={
            <DeleteUserAccountModal 
              deleteUserAccount={this.props.deleteUserAccount}
              history={this.props.history}
              close={this.toggleModal}
            /> 
          }
        />
        <p>Looking to delete your account? This will delete all information associated with your account.</p>
        <button 
          className="button button-danger"
          onClick={() => this.setState({ modalActive: true }) }
        >Delete Account</button>
      </React.Fragment>
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
    this.props.close()
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

