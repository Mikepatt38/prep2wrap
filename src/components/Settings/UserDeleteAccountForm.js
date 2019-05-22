import React, { Component } from 'react'

class DeleteUserAccountForm extends Component {

  handleDelete(e){
    e.preventDefault()
    this.props.deleteUserAccount(this.props.history)
  }
  render() {
    return (
      <div className="card">
        <p>this allows the user to delete their account!</p>
        <button 
          className="button button-danger"
          onClick={(e) => { if(window.confirm('Are you sure you wish to delete your account? All information will be deleted and you will be unsubscribed from your subscription with Crew It Up.')) this.handleDelete(e) } }
        >Delete Account</button>
      </div>
    )
  }
}

export default DeleteUserAccountForm