import React, { Component } from 'react'
import { UserSearchForm } from '../components/UserSearchForm'
import UserSearchTable from '../components/UserSearchTable'

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
      <UserSearchForm 
        searchUsersByName={this.props.searchUsersByName}
      />
    )
    else {
      return (
        <React.Fragment>
          <p className="centered">Search users by their first or last name to contact them, add them to your favorites, or check their profile.</p>
          <button
            className="button-form"
            onClick={() => this.setState({ userSearchFormActive: true })}
          >Search Users</button>
        </React.Fragment>
      )
    }
  }

  render() {
    const { userData, userDataFilled, loading, userSearchFormActive  } = this.state

    return (
      <div className="card-content centered">
        { this.renderSearchForm(userSearchFormActive) }
        { loading && <p className="card-item">Loading...</p> }
        {
          !loading && userDataFilled &&
          <UserSearchTable 
            headers={['Users Name', "Location", "Available Today"]}
            value={userData}
            setUserModal={this.props.setUserModal}
          />
        }
      </div>
    )
  }
}
