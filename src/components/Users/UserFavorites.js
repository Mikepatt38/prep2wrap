import React, { Component } from 'react'
import FavoritesIllustration from '../../img/illustration-favorites.svg'
import UserFavoritesTable from './UserFavoritesTable'

class UserFavorites extends Component {
  state = {
    loading: true
  }
  componentDidMount = () => {
    this.props.getUserFavorites(this.props.currentUser)
    this.setState({
      loading: false,
      favorites: this.props.favorites ? this.props.favorites : null
    })
  }

  render() {
    return (
      <div className="card no-hover">
        {this.state.loading && <p>Loading...</p>}
        <ul>
          {
            this.state.favorites.map( favorite => {
              console.log(favorite)
            })
          }
        </ul>
      </div>
    )
  }
}

export default UserFavorites
