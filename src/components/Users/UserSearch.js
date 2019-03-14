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

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      userData: nextProps.userSearchByNameResults.length > 0 ? nextProps.userSearchByNameResults : [],
      userDataFilled: nextProps.userSearchByNameResults.length > 0 ? true : false
    })
    setTimeout( ()=> {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    const { userData, loading  } = this.state

    return (
      <div className="app-page-section">
        <div className="section-title">
          <h3>Search Users:</h3>
        </div>
        { loading && <p>Loading...</p> }
        {
          !loading &&
          <UserSearchTable 
            headers={['', 'Name', 'Location', '']}
            value={userData}
            setUserModal={this.props.setUserModal}
          />
        }
      </div>
    )
  }
}
