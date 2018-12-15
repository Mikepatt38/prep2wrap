import React, { Component } from 'react'
import { UserSearch } from '../components/UserSearch'
import UserSearchTable from '../components/UserSearchTable'
import UserFavoritesTable from '../components/UserFavoritesTable'


const styles = {
  marginTop: '50px'
}

class UsersPage extends Component {
  state = {
    userData: [],
    loading: false,
    favorites: []
  }

  componentWillMount = () => {
    this.props.getUserFavorites(this.props.currentUser.id.toString())
  }

  componentWillUnmount = () => {
    this.props.stopListeningForFavorites(this.props.currentUser.id.toString())
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      userData: nextProps.userSearchByNameResults.length > 0 ? nextProps.userSearchByNameResults : [],
      favorites: nextProps.favorites
    })
    setTimeout( ()=> {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    const { searchUsersByName, setUserModal, currentUser, favorites} = this.props
    return (
      <React.Fragment>
        <div className="container containerMargin">
          <div className="card">
            <div className="card-header">
              <h3>User Search</h3>
              <p>Search for other user's profiles and information using the table below.</p>
            </div>
            <div className="card-body">
              <UserSearch searchUsersByName={searchUsersByName} />
              {
                this.state.userData.length > 0
                ?
                  <div className="card-item card-item-full">
                    <UserSearchTable 
                      headers={['Users Name', "Location", "Available Today"]}
                      value={this.state.userData}
                      setUserModal={setUserModal}
                    />
                  </div>
                :
                  this.state.loading 
                ?
                  <div className="card-item"><p>Loading...</p></div>
                :
                <div className="card-item centered"><p>No users to return.</p></div>
              }
            </div>
          </div>
        </div> 
        <div className="container" style={styles}>
          <div className="card">
            <div className="card-header">
              <h3>Favorited Users</h3>
              <p>These are your top eight recommendations from people in the industry that you vouch for.</p>
            </div>
            <div className="card-body">
              <div className="card-item">
                { favorites 
                  ?
                  <UserFavoritesTable
                    currentUser={currentUser}
                    favorites={favorites}
                  />
                  :
                  <p>You currently do not have any favorite friends. To add a favorite, search the user and visit their profile.</p>
                }
              </div>
            </div>
          </div>
        </div>  
      </React.Fragment>
    )  
  }
}

export default UsersPage
