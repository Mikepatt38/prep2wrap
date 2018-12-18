import React, { Component } from 'react'
import { UserSearchForm } from '../components/UserSearchForm'
import UserSearchTable from '../components/UserSearchTable'

export class UserSearch extends Component {
  state = {
    userData: [],
    userDataFilled: false,
    loading: false,
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
    const { userData, userDataFilled, loading  } = this.state
    const { searchUsersByName } = this.props
    
    return (
      <React.Fragment>
        <UserSearchForm 
          searchUsersByName={searchUsersByName}
        />
        {
          userDataFilled 
          ?
            <div className="card-item card-item-full">
              <UserSearchTable 
                headers={['Users Name', "Location", "Available Today"]}
                value={userData}
                setUserModal={this.props.setUserModal}
              />
            </div>
            :
              loading 
              ?
                <div className="card-item"><p>Loading...</p></div>
              :
              <div className="card-item centered"><p>No users to return.</p></div>

        }
      </React.Fragment>
    )
  }
}
