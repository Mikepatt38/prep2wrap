import React, { Component } from 'react'
import Avatar from '../../img/avatar-placeholder-min.png'
import DownloadIcon from '../../img/icon-download.svg'

class ProfileImageUpload extends Component {
  state = {
    fileName: '',
    userAvatar: this.props.currentUser.avatarUrl ? this.props.currentUser.avatarUrl : Avatar 
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
    return (
      <div className="account-settings-user-avatar">
        <div className="profile-image-upload">
          <div className="profile-image-upload-avatar">
            <img src={this.state.userAvatar} alt="Profile Avatar" />
          </div>
          <div className="profile-image-upload-update">
            <input type="file" name="profileImage" id="profileImage" onChange={this.handleFileChange}  />
            <label htmlFor="profileImage" id="profileImage">        
              <img src={DownloadIcon} alt="Image Upload Icon" /> Upload New Image
            </label>
            <p>{this.state.fileName}</p>
          </div>
        </div>
      </div>  
    )
  }
}

export default ProfileImageUpload