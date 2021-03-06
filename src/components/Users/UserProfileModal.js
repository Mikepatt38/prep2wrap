import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import CloseIcon from '../../img/icon-close.svg'
import Avatar from '../../img/avatar-placeholder-min.png'
import SKillsIcon from '../../img/icon-skills.svg'
import LocationIcon from '../../img/icon-location.svg'
import PositionsIcon from '../../img/icon-positions.svg'
import JobTypeIcon from '../../img/icon-jobtype.svg'
import TravelIcon from '../../img/icon-travel.svg'
import LanguagesIcon from '../../img/icon-languages.svg'
import UnionIcon from '../../img/icon-union.svg'
import StarIcon from '../../img/icon-star.svg'
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

  function isUserOwnProfile(){
    if(props.currentUser.id === props.user.id) return true
    return false
  }

  function checkIfUserIsInQuickCrew(){
    if(props.currentUser.id === props.user.id) return true
    else if(props.currentUser.favorites && props.currentUser.favorites.some( el => el.id === props.user.id)) return true
    else return false
  }

  function checkUserAvailability(){
    return props.currentUser.availability && props.currentUser.availability 
      ? props.currentUser.availability.some( el => el.date === moment().format('MM/DD/YYYY'))
      : false
  }

  return(
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open modal-user">
          <div className="modal modal-controlled">
            <div className="modal-header">
              <div className="modal-header-left">
                {
                  props.user.avatarUrl 
                    ? <img src={props.user.avatarUrl} alt="User Avatar" />
                    : <img src={Avatar} alt="User Avatar Placeholder" />
                }
                <div className="modal-header-right">
                  <h2>
                    {props.user.firstName} {props.user.lastName} &nbsp; 
                  </h2>
                  {!checkUserAvailability() ? <span className="user-pill available">Available Today</span> : <span className="user-pill unavailable">Unavailable Today</span>}
                </div>
              </div>
              <div className="modal-close">
                <div className="close" onClick={() => props.close()}><img src={CloseIcon} alt="Close Icon" /></div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">

                <div className="modal-cell-lg">
                  <label><img src={LocationIcon} alt="User Location Icon" />  Locations:</label>
                  <p>{props.user.profileInformation.location.map((loc, key) => {
                    return <span key={key}>{loc.label}</span>
                  })}</p>
                </div>
                <div className="modal-cell-lg">
                  <label><img src={SKillsIcon} alt="User Skills Icon" /> Skills:</label> 
                  <p>{props.user.profileInformation.skills.map((skill, key) => {
                    return <span key={key}>{skill.label}</span>
                  })}</p>
                </div>
                <div className="modal-cell-lg">
                  <label><img src={PositionsIcon} alt="User Positions Icon" /> Positions:</label> 
                  <p>{props.user.profileInformation.positions.map((position, key) => {
                    return <span key={key}>{position.label}</span>
                  })}</p>
                </div>
                <div className="modal-cell-lg">
                  <label><img src={JobTypeIcon} alt="User JobTypes Icon" /> Job Types Seeking:</label>
                  <p>{props.user.profileInformation.jobTypes.map((jobTypes, key) => {
                    return <span key={key}>{jobTypes.label}</span>
                  })}</p>
                </div>
                <div className="modal-cell-lg">
                  <label><img src={UnionIcon} alt="User Unions Icon" /> Union:</label> 
                  {
                    props.user.profileInformation.union
                    ? <p><span>{props.user.profileInformation.unions}</span></p>
                    : <p><span>Not a Union Member</span></p> 
                  }
                </div>
                <div className="modal-cell-lg">
                  <label><img src={TravelIcon} alt="User Travel Icon" /> Willing To Travel:</label> 
                  <p>{props.user.profileInformation.travel ? <span>Willing to Travel</span> : <span>Unwilling to Travel</span>}</p>
                </div>
                <div className="modal-cell-lg">
                  <label><img src={LanguagesIcon} alt="User Languages Icon" /> Languages Other Than English:</label> 
                  {
                    props.user.profileInformation.bilingual
                    ? <p><span>{props.user.profileInformation.languages}</span></p>
                    : <p><span>English Only Speaker</span></p> 
                  }
                </div>
                <div className="modal-cell-lg shared">
                  <label><img src={TravelIcon} alt="User Social Icon" /> User Social Accounts:</label> 
                  <span className="social-pill"><a target="_blank" rel="noopener noreferrer" href={`${props.user.profileInformation.fbLink}`}><img src={FacebookLogo} alt="Facebook Account Logo Link" /> Facebook</a></span>
                  <span className="social-pill"><a target="_blank" rel="noopener noreferrer" href={`${props.user.profileInformation.instagramLink}`}><img src={InstagramLogo} alt="Instagram Account Logo Link" /> Instagram</a></span>
                  <span className="social-pill"><a target="_blank" rel="noopener noreferrer" href={`${props.user.profileInformation.imdbLink}`}><img src={IMDBLogo} alt="IMDB Account Logo Link" /> IMDb</a></span>
                </div>
                {
                  !isUserOwnProfile() &&
                  <div className="modal-cell-lg">
                    {
                      checkIfUserIsInQuickCrew()
                      ? <label><img src={StarIcon} alt="User Favorites Icon" /> Member of Your Quick Crew</label> 
                      : <button className="button button-primary" onClick={() => handleAddUserFavorites(props.user)}>Add to Quick Crew</button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null
  )
}

export default UserProfileModal