import React, { Component } from 'react'
import FavoritesIllustration from '../img/illustration-favorites.svg'
import UserFavoritesTable from '../components/UserFavoritesTable'

class UserFavorites extends Component {
  state = {
    userFavorites: [],
    doesUserHaveFavorites: false,
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
      doesUserHaveFavorites: nextProps.favorites.length > 0 ? true : false
    })
    setTimeout( ()=> {
      this.setState({
        loading: false
      })
    }, 1000)
  }

  render() {
    if(this.state.loading) return ( <p className="card-item">Loading...</p> )

    return (
      <div className="card-content centered">
        { this.state.doesUserHaveFavorites
          ?
          <UserFavoritesTable
            currentUser={this.props.currentUser}
            favorites={this.state.userFavorites}
          />
          :
          <React.Fragment>
            <img src={FavoritesIllustration} alt="Illustration for user favorites" />
            <p className="centered">You currently do not have any favorite friends. To add a favorite, search the user and visit their profile.</p>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default UserFavorites
