import React, { Component } from 'react'
import { PageHeader } from '../components/PageHeader'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'
import UserSearchTable from '../components/UserSearchTable'


const styles = {
  marginTop: '50px'
}

class UsersPage extends Component {
  state = {
    userData: [],
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      userData: nextProps.userSearchByNameResults
    })
    setTimeout( ()=> {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  componentWillUnmount() {
    this.setState({
      userData: []
    })
  }

  render() {
    const { searchUsersByName, setModal, userSearchByNameResults } = this.props
    return (
      <React.Fragment>
        <PageHeader pageTitle="Users Directory" />
        <div className="container">
          <div className="card">
            <div className="card-header card-header-flex">
              <div className="card-header-flex-text">
                <h2 className="card-title">User Search</h2>
                <p className="card-subtitle">Search for users by their first or last name.</p>
              </div>
              <div className="card-header-flex-component">
                <UserSearch searchUsersByName={searchUsersByName} />
              </div>
            </div>
              { this.state.loading 
                ?
                  <div className="card-item"><p>Loading...</p></div>
                :
                  this.state.userData.length > 0
                  ?
                  <div className="card-item card-item-full">
                    <UserSearchTable 
                      headers={['Users Name', "Location", "Available Today"]}
                      value={this.state.userData}
                    />
                  </div>
                  :
                  <div className="card-item"><p>Enter user's name to find users</p></div>
              }
          </div>
        </div> 
        <div className="container" style={styles}>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">My Favorites</h2>
              <p className="card-subtitle">These are your top eight recommendations from people in the industry that you vouch for.</p>
            </div>
            <div className="card-item">
              <p>You currently do not have any favorite friends. To add a favorite, search the user and visit their profile.</p>
            </div>
          </div>
        </div>  
      </React.Fragment>
    )  
  }
}

export default UsersPage


// <div className="card">
// <div className="card-header">
//   <h2 className="card-title">Search For Users</h2>
//   <p className="card-subtitle">This is text that will be shown above the components such as tables and calendar to give a brief description.</p>
// </div>
// <div className="card-item">
//   <UserSearch searchUsersByName={searchUsersByName} />
//   { this.state.userData.length !== 0 ? 
//     <React.Fragment>
//       <hr />
//       <UserSearchTable 
//         headers={['Users Name', "Location", "Available Today"]}
//         value={userSearchByNameResults}
//       />
//     </React.Fragment>
//   :
//     ''
//   }
// </div>
// </div>