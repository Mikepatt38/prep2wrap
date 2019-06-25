import React from 'react'
import ReactDOM from 'react-dom'
import CloseIcon from '../../img/icon-close.svg'
import Avatar from '../../img/avatar-placeholder-min.png'
import FacebookLogo from '../../img/logo-facebook.svg'
import InstagramLogo from '../../img/logo-instagram.svg'
import IMDBLogo from '../../img/logo-imdb.svg'


function UserProfileModal(props){

  function handleAddUserFavorites(){
    const currentUserFavorites = this.props.currentUser.favorites ? this.props.currentUser.favorites : []
    this.props.addToUsersFavorites(this.props.currentUser.id.toString(), currentUserFavorites, this.props.user)
  }

  return(
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open modal-user-profile">
          <div className="modal">
            <div className="modal-header">
              <div className="user-header">
                <div className="user-header-user">
                  {
                    props.user.profileInformation.avatarUrl 
                      ? <img src={props.user.profileInformation.avatarUrl} alt="User Profile Image" />
                      : <img src={Avatar} alt="User Avatar Placeholder Image" />
                  }
                  <div className="user-info">
                    <h2>{props.user.firstName} {props.user.lastName}</h2>
                    <a href={`mailto:${props.user.email}`}>{props.user.email}</a>
                  </div>
                </div>
                <div className="user-header-action">
                  <button className="button button-transparent" onClick={() => props.close()}><img src={CloseIcon} alt="Close Modal Icon" /></button>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-component">
                <div className="user">
                  <div className="user-body">
                    <div className="user-body-section">
                      <div className="user-body-item">
                        <label>Skills:</label>
                        <p>{props.user.profileInformation.skills.map(skill => {
                          return <span>{skill.label}</span>
                        })}</p>
                      </div>
                      <div className="user-body-item">
                        <label>Positions:</label>
                        <p>{props.user.profileInformation.positions.map(position => {
                          return <span>{position.label}</span>
                        })}</p>
                      </div>
                      <div className="user-body-item">
                        <label>Job Types:</label>
                        <p>{props.user.profileInformation.jobTypes.map(type => {
                          return <span>{type.label}</span>
                        })}</p>
                      </div>
                    </div>

                    <div className="user-body-section">
                      <div className="user-body-item">
                        <label>Member of the Following Unions:</label>
                        <p>{props.user.profileInformation.union
                          ? props.user.profileInformation.union.map( el => {
                              return <span>{el}</span>
                            })
                          : <span>None</span>
                        }</p>
                      </div>
                      <div className="user-body-item">
                        <label>Other Languages Spoken:</label>
                        <p>{props.user.profileInformation.bilingual
                          ? props.user.profileInformation.bilingual.map( el => {
                              return <span>{el}</span>
                            })
                          : <span>None</span>
                        }</p>
                      </div>
                    </div>

                    <div className="user-body-section">
                      <div className="user-body-item socials">
                        <label>Social Profiles:</label>
                        <span className="social-pill"><img src={FacebookLogo} alt="Facebook Account Logo Link" /> Facebook</span>
                        <span className="social-pill"><img src={InstagramLogo} alt="Instagram Account Logo Link" /> Instagram</span>
                        <span className="social-pill"><img src={IMDBLogo} alt="IMDB Account Logo Link" /> IMDb</span>
                      </div>
                    </div> 
                    
                    <div className="button-wrapper align-left">
                      <button className="button button-primary">Add to Quick Crew</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  )
}

// class UserProfileModal extends Component {
//   state = {
//     active: false,
//     positions: [],
//     skills: [],
//     locations: [],
//     userLoaded: false
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       active: nextProps.userModalActive
//     },
//     () => {
//       this.state.active && this.setupUserOverview(this.props.user)
//     })
//   }

//   setupUserOverview = (user) => {
//     this.setState({
//       positions: this.setUserAttribute(user.profileInformation.positions),
//       skills: this.setUserAttribute(user.profileInformation.skills),
//       locations: this.setUserAttribute(user.profileInformation.location)
//     },
//     () => {
//       this.setState({
//         userLoaded: true
//       })
//     })
//   }

//   setUserAttribute = (obj) => {
//     let arr = []
//     obj.forEach( label => {
//       arr.push(label.value)
//     })
//     return arr
//   }

//   handleAddFavorite = async (addToUsersFavorites, user) => {
//     const userCurrentFavorites = this.props.currentUser.favorites ? this.props.currentUser.favorites : [] 
//     const userAdded = await addToUsersFavorites(this.props.currentUser.id.toString(), userCurrentFavorites, user)
//   }

//   render() {
//     const { user, addToUsersFavorites } = this.props

//     return (
//       <div className={ this.props.userModalActive ? 'modalBg modal-open' : 'modalBg'}>
//         <div className="modal">
//           <div className="modal-header">
//             <h2>{ user && user.firstName } { user && user.lastName}</h2>
//             <img src={CloseIcon} 
//               alt="Close icon for modal" 
//               role="button"
//               onClick={() => {}}
//             />
//           </div>
//           <div className="modal-body">
//             <div className="user-overview">
//               { user &&
//                 <Fragment>
//                   <div className="user-overview-item">
//                     <label>Location:</label>
//                     <p>{
//                       this.state.locations.map( (location, key) => {
//                         return key === this.state.locations.length -1 ? location : location + ', '
//                       })
//                     }</p>
//                   </div>
//                   <div className="user-overview-item">
//                     <label>Skills:</label>
//                     <p>{
//                       this.state.skills.map( (skill, key) => {
//                         return key === this.state.skills.length -1 ? skill : skill + ', '
//                       })
//                     }</p>
//                   </div>
//                   <div className="user-overview-item">
//                     <label>Positions:</label>
//                     <p>{
//                       this.state.positions.map( (position, key) => {
//                         return key === this.state.positions.length -1 ? position : position + ', '
//                       })
//                     }</p>
//                   </div>
//                   <div className="user-overview-item">
//                     <label>Other Languages Spoken:</label>
//                     <p>{user.profileInformation.languages.length > 0 ? user.languages : 'No Other Languages Spoken'}</p>
//                   </div>
//                   <div className="user-overview-item">
//                     <label>Union Members:</label>
//                     <p>{user.profileInformation.unions.length > 0 ? user.unions : 'None'}</p>
//                   </div>
//                   <div className="user-overview-item">
//                     <label>Willing to Travel:</label>
//                     <p>{user.profileInformation.travel ? 'Yes' : 'No' }</p>
//                   </div>
//                   <div className='user-overview-item'>
//                     <a href={user.profileInformation.fbLink}>Visit {user.firstName} Facebook</a>
//                   </div>
//                   <div className='user-overview-item'>
//                     <a href={user.profileInformation.imdbLink}>Visit {user.firstName} IMDb</a>
//                   </div>
//                   <div className='user-overview-item'>
//                     <a href="/">Email {user.firstName}</a>
//                   </div>
//                   <div className='user-overview-item'>
//                     <button 
//                       className="btn-user-overview"
//                       onClick={() => this.handleAddFavorite(addToUsersFavorites, user)}
//                     >
//                       Add User To Favorites
//                     </button>
//                   </div>
//                 </Fragment>
//               }
//               </div>   
//           </div>
//         </div>
//       </div>  
//     )
//   }
// }


export default UserProfileModal