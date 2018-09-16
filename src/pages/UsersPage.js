import React, { Component } from 'react'
import { PageHeader } from '../components/PageHeader'
import { UserSearch } from '../components/UserSearch'
import { Card } from '../components/Card'
import Table from '../components/Table'

const styles = {
  marginTop: '50px'
}

class UsersPage extends Component {
  state = {
    userData: []
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userData: nextProps.userSearchByNameResults
    })
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
          <h2 className="component-title">Search For Users</h2>
          <p className="component-text">This is text that will be shown above the components such as tables and calendar to give a brief description.</p>
          <div className="component-section">
            <UserSearch searchUsersByName={searchUsersByName} />
            { this.state.userData.length !== 0 ? 
              <React.Fragment>
                <hr />
                <Table 
                  headers={['Users Name', "Location", "Available Today"]}
                  value={userSearchByNameResults}
                />
              </React.Fragment>
            :
              ''
            }
          </div>
        </div> 
        <div className="container" style={styles}>
          <h2 className="component-title">My Favorites</h2>
          <p className="component-text">These are your top eight recommendations from people in the industry that you vouch for.</p>
          <div className="component-section">
            <p>You currently do not have any favorite friends. To add a favorite, search the user and visit their profile.</p>
          </div>
        </div>  
      </React.Fragment>
    )  
  }
}

export default UsersPage