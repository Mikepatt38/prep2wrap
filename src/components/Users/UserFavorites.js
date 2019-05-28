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
        {
          this.state.loading === false || this.state.favorites > 0 
          ?
          <UserFavoritesTable
            userFavorites={this.state.favorites}
          />
          :
          <div className="empty-state">
            <p>You currently do not have any users in your quick crew.</p>
            <p>To add users, click the button in the top right to search through users and add them as a favorite from the search results table.</p>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default UserFavorites
