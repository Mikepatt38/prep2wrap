import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthorization from '../../containers/withAuthorization'
// import { api } from '../../db'
// import UsersList from '../components/UsersList'

class UsersPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    usersList: [],
    users: []
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { firstName, lastName } = this.state
    // api.userSearch(firstName, lastName).then( users => {
    //   this.setState({
    //     users: users,
    //     name: ''
    //   })
    // })
  }

  render() {
    const { firstName, lastName, users } = this.state
    return (
      <div className="container">
        <h1 className="page-title">Find A User</h1>
        <form className="form-users-search">
          <div className="grid">
            <div className="grid-row">
              <div className="grid-item">
                <div className="form-group">
                <label>User's First Name:</label>
                  <input 
                    name="firstName"
                    onChange={this.handleChange}
                    type="text"
                    value={firstName}
                  />
                </div>
              </div>
              <div className="grid-item">
                <div className="form-group">
                <label>User's Last Name:</label>
                  <input 
                    name="lastName"
                    onChange={this.handleChange}
                    type="text"
                    value={lastName}
                  />
                </div>
              </div>
            </div>
          </div>     
          <div className="form-group">
            <button 
              type="submit"
              onClick={this.onSubmit}
              className="btn-primary" 
            >
              Find Users
            </button>
          </div>
        </form>
        <div>
          {/* <UsersList users={users} />  */}
        </div> 
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser

export default compose(
  withAuthorization(authCondition)
)(UsersPage)