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

  renderSearchForm = (active) => {
    if(active) return (
      <React.Fragment>
        <div className="section-title">
          <h3>Search Users:</h3>
        </div>
        <div className="card no-hover">
          <UserSearchForm 
            searchUsersByName={this.props.searchUsersByName}
            toggleUserSearchForm={this.toggleUserSearchForm}
          />
        </div>
      </React.Fragment>
    )
    else {
      return (
        <button
          className="button-primary"
          onClick={() => this.setState({ userSearchFormActive: true })}
        >Search Users</button>
      )
    }
  }

  render() {
    const { userData, userDataFilled, loading, userSearchFormActive  } = this.state

    return (
      <div className="app-page-section">
        { this.renderSearchForm(userSearchFormActive) }
        { loading && <p>Loading...</p> }
        {
          !loading && userDataFilled &&
          <UserSearchTable 
            headers={['', 'Name', 'Location', 'Times Favorited', '']}
            value={userData}
            setUserModal={this.props.setUserModal}
          />
        }
      </div>
    )
  }
}
