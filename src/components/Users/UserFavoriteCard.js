import React from 'react'
import AvatarPlaceholder from '../../img/avatar-placeholder-min.png'

export const UserFavoriteCard = ({ user }) => (
  <div className="card user-favorite-card">
    <div className="user">
      <div className="user-information">
        <div className="user-information-avatar">
          { user.avatar.length > 0 
            ? <img src={user.avatar} alt="User Avatar" />
            : <img src={AvatarPlaceholder} alt="User Avatar Placeholder" />
          }
        </div>
        <div className="user-information-details">
          <h4>{user.name}</h4>
          <p>{user.location}</p>
          <p><span className="availability available">Available</span></p>
        </div>
      </div>
    </div>
  </div>
)



// <div className="card user-favorite-card">
// <div className="user">
//   <div className="user-avatar">
//     { user.avatar.length > 0 
//       ? <img src={user.avatar} alt="User Avatar" />
//       : <img src={AvatarPlaceholder} alt="User Avatar Placeholder" />
//     }
//   </div>
//   <div className="user-details">
//     <h4>{user.name}</h4>
//     <p>{user.location}</p>
//     <div className="user-details-actions">
//       <a href={`mailto:${user.email}`}>contact</a>
//       <a href="">view profile</a>
//     </div>
//   </div>
// </div>
// <div className="actions">
//   <a href={`mailto:${user.email}`}>contact</a>
//   <a href="">view profile</a>
//   <a href="/">remove</a>
// </div>
// </div>