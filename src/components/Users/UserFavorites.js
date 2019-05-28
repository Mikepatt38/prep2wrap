import React, { Component } from 'react'
import {UserFavoriteCard} from './UserFavoriteCard'
import { UserFavoritesTable } from './UserFavoritesTable';

class UserFavorites extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    // this.props.getUserFavorites(this.props.currentUser)
    const userFavorites = await this.props.getCurrentFavorites(this.props.currentUser.id)
    this.setState({
      loading: false,
      favorites: userFavorites
    })
  }

  render() {
    if(this.state.loading) return <p>Loading...</p>
    return (
      <React.Fragment>
        <UserFavoritesTable
          userFavorites={this.state.favorites}
        />
      </React.Fragment>
    )
  }
}

export default UserFavorites
