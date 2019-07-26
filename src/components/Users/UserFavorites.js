import React, { Component } from 'react'
import { UserFavoritesTable } from './UserFavoritesTable'
import Loading from "../General/Loading"
import CrewIllustration from '../../img/illustrations/crew.svg'
import EmptyState from '../General/EmptyState'

class UserFavorites extends Component {
  state = {
    pageLoading: true
  }
  
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        pageLoading: false
    })}, 500)
  }

  render() {
    if(this.state.pageLoading){
      return (
        <Loading />
      )
    }
    return (
      <React.Fragment>
        {
          this.props.currentUser.favorites && this.props.currentUser.favorites.length
          ?
            <React.Fragment>
              <p>This is your quick crew, add members you hire or work with frequently to make it easier to communicate with them.</p>
              <UserFavoritesTable
                currentUser={this.props.currentUser}
                getCurrentFavorites={this.props.getCurrentFavorites}
                removeUserFromUserFavorites={this.props.removeUserFromUserFavorites}
              />
            </React.Fragment>
          :
          <EmptyState
            imgSrc={CrewIllustration}
            imgAlt="Availability Page Illustration"
            title="You do not have any members in your quick crew."
            text="To add crew members, use the quick search below to find crew members and add them as a to your quick crew from the search results table."
          />
        }
      </React.Fragment>
    )
  }
}

export default UserFavorites
