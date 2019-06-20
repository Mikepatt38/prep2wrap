import React, { Component } from 'react'
import { UserSearchForm } from './UserSearchForm'
import UserSearchTable from './UserSearchTable'

export class UserSearch extends Component {
  state = {
    userData: [],
    userDataFilled: false,
    loading: false,
    userSearchFormActive: false
  }

  componentWillUnmount = () => {
    this.props.clearSearchUserByNameResults()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userSearchByNameResults !== this.props.userSearchByNameResults) {
      this.setState({
        loading: true,
        userData: this.props.userSearchByNameResults,
        userDataFilled: this.props.userDataFilled
      })
      setTimeout( ()=> {
        this.setState({
          loading: false
        })
      }, 1000)
    }
  }

  render() {
    const { userData, loading  } = this.state

    return (
      <div className="app-page-section">
        <UserSearchTable 
          users={userData}
          setUserModal={this.props.setUserModal}
          usersSearch={this.props.usersSearch}
          close={this.props.close}
        />
      </div>
    )
  }
}
