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
      <div className="card-form-column">
        <div className="card-form-avatar">
          <label>Profile Avatar:</label>
          <div className="profile-image-upload">
            <input type="file" name="profileImage" id="profileImage" onChange={this.handleFileChange}  />
            <label htmlFor="profileImage" id="profileImage">        
              {
                profileInformation.avatarUrl 
                ? <img src={profileInformation.avatarUrl} alt="Profile Avatar" />
                : <img src={Avatar} alt="Profile Avatar Placeholder" />
              }
            </label>
            <p>{this.state.fileName}</p>
          </div>
        </div>  
      </div>   
    )
  }
}

export default ProfileImageUpload