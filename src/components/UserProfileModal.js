import React, { Component, Fragment } from 'react'
import CloseIcon from '../img/icon-close.svg'

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
      positions: this.setUserAttribute(user.positions),
      skills: this.setUserAttribute(user.skills),
      locations: this.setUserAttribute(user.location)
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

  handleAddFavorite = async (addUserToFavorite, user) => {
    const userAdded = await addUserToFavorite(this.props.currentUser.id.toString(), user)
      .then(() => {
        return true
      })
      .catch((error) => {
        console.log("Error: " + error)
      })
    this.setState({
      favoritesUpdated: userAdded ? true : false
    })
  }

  render() {
    const { user, setUserModal, addUserToFavorite } = this.props

    return (
      <div className={ this.props.userModalActive ? 'modalBg modal-open' : 'modalBg'}>
        <div className="modal">
          <div className="modal-header">
            <h2>{ user && user.firstName } { user && user.lastName}</h2>
            <img src={CloseIcon} 
              alt="Close icon for modal" 
              role="button"
              onClick={() => setUserModal(false, null)}
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
                    <label>Available Today:</label>
                    <p>{ user.availability ? 'Available' : 'Unavailable'}</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Other Languages Spoken:</label>
                    <p>{user.languages.length > 0 ? user.languages : 'No Other Languages Spoken'}</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Union Members:</label>
                    <p>{user.unions.length > 0 ? user.unions : 'None'}</p>
                  </div>
                  <div className="user-overview-item">
                    <label>Willing to Travel:</label>
                    <p>{user.travel ? 'Yes' : 'No' }</p>
                  </div>
                  <div className='user-overview-item'>
                    <a href={user.fbLink}>Visit {user.firstName} Facebook</a>
                  </div>
                  <div className='user-overview-item'>
                    <a href={user.imdbLink}>Visit {user.firstName} IMDb</a>
                  </div>
                  <div className='user-overview-item'>
                    <a href="/">Email {user.firstName}</a>
                  </div>
                  <div className='user-overview-item'>
                    <button 
                      className="btn-user-overview"
                      onClick={() => this.handleAddFavorite(addUserToFavorite, user)}
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


// <div className={ this.props.userModalActive ? 'modal modal-open' : 'modal'}>
// <div className="modal-dialogue user-modal">
//   <div className="modal-content">
//     { this.state.favoritesUpdated &&  
//       <div className="alert success active alert-modal">
//         <p>Success: User was added to your favoritesUpdated!</p>
//       </div>
//     } 
//     <div className="modal-header">
//       <h3>{ user && user.firstName } { user && user.lastName}</h3>  
//       <a 
//         role="button"
//         onClick={() => setUserModal(false, null)}
//       >
//         <img src={CloseIcon} />
//       </a>          
//     </div>
//     <div className="modal-body">
//       <div className="user-overview">
//       { user &&
//         <Fragment>
//           <div className="user-overview-item">
//             <label>Location:</label>
//             <p>{
//               this.state.locations.map( (location, key) => {
//                 return key === this.state.locations.length -1 ? location : location + ', '
//               })
//             }</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Skills:</label>
//             <p>{
//               this.state.skills.map( (skill, key) => {
//                 return key === this.state.skills.length -1 ? skill : skill + ', '
//               })
//             }</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Positions:</label>
//             <p>{
//               this.state.positions.map( (position, key) => {
//                 return key === this.state.positions.length -1 ? position : position + ', '
//               })
//             }</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Available Today:</label>
//             <p>{ user.availability ? 'Available' : 'Unavailable'}</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Other Languages Spoken:</label>
//             <p>{user.languages.length > 0 ? user.languages : 'No Other Languages Spoken'}</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Union Members:</label>
//             <p>{user.unions.length > 0 ? user.unions : 'None'}</p>
//           </div>
//           <div className="user-overview-item">
//             <label>Willing to Travel:</label>
//             <p>{user.travel ? 'Yes' : 'No' }</p>
//           </div>
//           <div className='user-overview-item'>
//             <a href={user.fbLink}>Visit {user.firstName} Facebook</a>
//           </div>
//           <div className='user-overview-item'>
//             <a href={user.imdbLink}>Visit {user.firstName} IMDb</a>
//           </div>
//           <div className='user-overview-item'>
//             <a href="/">Email {user.firstName}</a>
//           </div>
//           <div className='user-overview-item'>
//             <button 
//               className="btn-user-overview"
//               onClick={() => this.handleAddFavorite(addUserToFavorite, user)}
//             >
//               Add User To Favorites
//             </button>
//           </div>
//         </Fragment>
//       }
//       </div>
//     </div>
//   </div>
// </div>
// </div>