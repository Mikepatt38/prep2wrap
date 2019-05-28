import React, { Component } from 'react'
import Avatar from '../../img/avatar-placeholder-min.png'

class ProfileImageUpload extends Component {
  state = {
    fileName: ''
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = file.name
    if (!file) {
      return
    }
    else {
      this.setState({
        fileName
      }, 
      () => {
        this.props.updateFileName(file)
      })
    }
  }

  render() {
    const { profileInformation } = this.props.currentUser
    return (
      <div className="account-settings-user-avatar">
        <div className="profile-image-upload">
          <div className="profile-image-upload-avatar">
            {
              profileInformation && profileInformation.avatarUrl 
              ? <img src={profileInformation.avatarUrl} alt="Profile Avatar" />
              : <img src={Avatar} alt="Profile Avatar Placeholder" />
            }
          </div>
          <div className="profile-image-upload-update">
            <input type="file" name="profileImage" id="profileImage" onChange={this.handleFileChange}  />
            <label htmlFor="profileImage" id="profileImage">        
              Upload new image
            </label>
            <p>{this.state.fileName}</p>
          </div>
        </div>
      </div>  
    )
  }
}

export default ProfileImageUpload