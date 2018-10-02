import React, { Fragment } from 'react'

export const ProfileImageUpload = ({ uploadProfileImage, currentUser }) => {
  return (
    <div className="profile-image-upload">
      <input type="file" name="profileImage" id="profileImage"  />
      <button 
        className="button-primary" 
        onClick={() => uploadProfileImage(currentUser.id, currentUser.avatar, document.querySelector('#profileImage').files[0])}
      > 
        { currentUser.avatar ? 'Edit' : 'Upload' } 
      </button>
    </div>
  )
}