import React, { Component } from 'react'
import {UserFavoriteCard} from './UserFavoriteCard'

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
    return (
      <React.Fragment>
        { this.state.loading && <p>Loading...</p>}
        { this.state.favorites &&
          <div className="user-favorites">
            { this.state.favorites.map( (favorite, key) => {
              return ( <UserFavoriteCard user={favorite} key={key} /> ) }) 
            }
          </div>
        }
      </React.Fragment>
    )
  }
}

export default UserFavorites
