import React, { Component } from 'react'
import UserFavoritesTable from '../components/UserFavoritesTable'

class UserFavorites extends Component {
  state = {
    userFavorites: [],
    loading: false
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
      userFavorites: nextProps.favorites,
    })
    setTimeout( ()=> {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    return (
      <div className="card-item">
        { this.state.userFavorites 
          ?
          <UserFavoritesTable
            currentUser={this.props.currentUser}
            favorites={this.state.userFavorites}
          />
          :
          <p>You currently do not have any favorite friends. To add a favorite, search the user and visit their profile.</p>
        }
      </div>
    )
  }
}

export default UserFavorites
