import React, { Component } from 'react'
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
        <div className="card">
          <div className="card-body">
            <UserSearchTable 
              users={userData}
              currentUser={this.props.currentUser}
              setUserModal={this.props.setUserModal}
              usersSearch={this.props.usersSearch}
              updateUserFavorites={this.props.updateUserFavorites}
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    )
  }
}
