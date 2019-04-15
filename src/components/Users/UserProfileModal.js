import React, { Component, Fragment } from 'react'
import CloseIcon from '../../img/icon-close.svg'

class UserProfileModal extends Component {
  state = {
    active: false,
    positions: [],
    skills: [],
    locations: [],
    userLoaded: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.userModalActive
    },
    () => {
      this.state.active && this.setupUserOverview(this.props.user)
    })
  }

  setupUserOverview = (user) => {
    this.setState({
      positions: this.setUserAttribute(user.profileInformation.positions),
      skills: this.setUserAttribute(user.profileInformation.skills),
      locations: this.setUserAttribute(user.profileInformation.location)
    },
    () => {
      this.setState({
        userLoaded: true
      })
    })
  }

  setUserAttribute = (obj) => {
    let arr = []
    obj.forEach( label => {
      arr.push(label.value)
    })
    return arr
  }

  handleAddFavorite = async (addToUsersFavorites, user) => {
    const userCurrentFavorites = this.props.currentUser.favorites ? this.props.currentUser.favorites : [] 
    const userAdded = await addToUsersFavorites(this.props.currentUser.id.toString(), userCurrentFavorites, user)
    this.props.closeModal(false)
  }

  render() {
    const { user, addToUsersFavorites, closeModal } = this.props

    return (
      <div className={ this.props.userModalActive ? 'modalBg modal-open' : 'modalBg'}>
        <div className="modal">
          <div className="modal-header">
            <h2>{ user && user.firstName } { user && user.lastName}</h2>
            <img src={CloseIcon} 
              alt="Close icon for modal" 
              role="button"
              onClick={() => closeModal(false)}
            />
          </div>
          <div className="modal-body">
            <div className="user-overview">
              { user &&
                <Fragment>
                  <div className="user-overview-item">
                    <label>Location:</label>
                    <p>{
                      this.state.locations.map( (location, key) => {
                        return key === this.state.locations.length -1 ? location : location + ', '
                      })
                    }</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Skills:</label>
                    <p>{
                      this.state.skills.map( (skill, key) => {
                        return key === this.state.skills.length -1 ? skill : skill + ', '
                      })
                    }</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Positions:</label>
                    <p>{
                      this.state.positions.map( (position, key) => {
                        return key === this.state.positions.length -1 ? position : position + ', '
                      })
                    }</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Other Languages Spoken:</label>
                    <p>{user.profileInformation.languages.length > 0 ? user.languages : 'No Other Languages Spoken'}</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Union Members:</label>
                    <p>{user.profileInformation.unions.length > 0 ? user.unions : 'None'}</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Willing to Travel:</label>
                    <p>{user.profileInformation.travel ? 'Yes' : 'No' }</p>
                  </div>
                  <div className='user-overview-item'>
                    <a href={user.profileInformation.fbLink}>Visit {user.firstName} Facebook</a>
                  </div>
                  <div className='user-overview-item'>
                    <a href={user.profileInformation.imdbLink}>Visit {user.firstName} IMDb</a>
                  </div>
                  <div className='user-overview-item'>
                    <a href="/">Email {user.firstName}</a>
                  </div>
                  <div className='user-overview-item'>
                    <button 
                      className="btn-user-overview"
                      onClick={() => this.handleAddFavorite(addToUsersFavorites, user)}
                    >
                      Add User To Favorites
                    </button>
                  </div>
                </Fragment>
              }
              </div>   
          </div>
        </div>
      </div>  
    )
  }
}


export default UserProfileModal