import React, { Component } from 'react'
import FavoritesIllustration from '../../img/illustration-favorites.svg'
import UserFavoritesTable from './UserFavoritesTable'

class UserFavorites extends Component {
  componentDidlMount = () => {
    this.props.getUserFavorites(this.props.currentUser)
  }

  render() {
    return (
      <div className="card-content centered">
        <UserFavoritesTable
          currentUser={this.props.currentUser}
          favorites={this.props.favorites}
        />
      </div>
    )
  }
}

export default UserFavorites
