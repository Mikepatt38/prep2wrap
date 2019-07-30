import React from 'react'
import ReactDOM from 'react-dom'
import CloseIcon from '../../img/icon-close.svg'
import Avatar from '../../img/avatar-placeholder-min.png'
import FacebookLogo from '../../img/logo-facebook.svg'
import InstagramLogo from '../../img/logo-instagram.svg'
import IMDBLogo from '../../img/logo-imdb.svg'


function UserProfileModal(props){

  const handleAddUserFavorites = (userToAdd) => {
    const currentUserFavorites = props.currentUser.favorites ? props.currentUser.favorites : []
    const updatedUserFavorites = [...currentUserFavorites, userToAdd]
    props.updateUserFavorites(props.currentUser.id, updatedUserFavorites)
    .then(() => props.toggleAllModals())
  }

  function checkIfUserIsInQuickCrew(){
    if(props.currentUser.id === props.user.id) return true
    else if(props.currentUser.favorites && props.currentUser.favorites.some( el => el.id === props.user.id)) return true
    else return false
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
                    props.user.avatarUrl 
                      ? <img src={props.user.avatarUrl} alt="User Profile Image" />
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
                        <label>Locations:</label>
                        <p>{props.user.profileInformation.location.map((loc, key) => {
                          return <span key={key}>{loc.label}</span>
                        })}</p>
                      </div>
                      <div className="user-body-item">
                        <label>Skills:</label>
                        <p>{props.user.profileInformation.skills.map((skill, key) => {
                          return <span key={key}>{skill.label}</span>
                        })}</p>
                      </div>
                      <div className="user-body-item">
                        <label>Positions:</label>
                        <p>{props.user.profileInformation.positions.map((position, key) => {
                          return <span key={key}>{position.label}</span>
                        })}</p>
                      </div>
                      <div className="user-body-item">
                        <label>Job Types:</label>
                        <p>{props.user.profileInformation.jobTypes.map((type, key) => {
                          return <span key={key}>{type.label}</span>
                        })}</p>
                      </div>
                    </div>

                    <div className="user-body-section">
                      <div className="user-body-item">
                        <label>Member of the Following Unions:</label>
                        <p>{props.user.profileInformation.union
                          ? <span>{props.user.profileInformation.unions}</span>
                          : <span>None</span>
                        }</p>
                      </div>
                      <div className="user-body-item">
                        <label>Willing to Travel:</label>
                        <p>{props.user.profileInformation.travel === true
                          ? <span>Yes</span>
                          : <span>No</span>
                        }</p>
                      </div>
                      <div className="user-body-item">
                        <label>Other Languages Spoken:</label>
                        <p>{props.user.profileInformation.bilingual
                          ? <span>{props.user.profileInformation.languages}</span>
                          : <span>None</span>
                        }</p>
                      </div>
                    </div>

                    <div className="user-body-section">
                      <div className="user-body-item socials">
                        <label>Social Profiles:</label>
                        <span className="social-pill"><a target="_blank" href={`${props.user.profileInformation.fbLink}`}><img src={FacebookLogo} alt="Facebook Account Logo Link" /> Facebook</a></span>
                        <span className="social-pill"><a target="_blank" href={`${props.user.profileInformation.instagramLink}`}><img src={InstagramLogo} alt="Instagram Account Logo Link" /> Instagram</a></span>
                        <span className="social-pill"><a target="_blank" href={`${props.user.profileInformation.imdbLink}`}><img src={IMDBLogo} alt="IMDB Account Logo Link" /> IMDb</a></span>
                      </div>
                    </div> 
                    
                    <div className="button-wrapper align-left">
                      {
                        !checkIfUserIsInQuickCrew() && <button className="button button-primary" onClick={() => handleAddUserFavorites(props.user)}>Add to Quick Crew</button>
                      }
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

export default UserProfileModal