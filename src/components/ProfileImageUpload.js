import React, { Component } from 'react'

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
    const { currentUser } = this.props
    return (
      <div className="card-form-avatar">
        <label>Profile Avatar:</label>
        <div className="profile-image-upload">
          <input type="file" name="profileImage" id="profileImage" onChange={this.handleFileChange}  />
          <label htmlFor="profileImage" id="profileImage">        
            {currentUser.avatar ? 
              <img src={currentUser.avatar} alt="Profile Avatar" /> :
              <p>No Avatar.</p>
            }
          </label>
          <p>{this.state.fileName}</p>
        </div>
      </div>     
    )
  }
}

export default ProfileImageUpload
// <button 
// className="button-form" 
// onClick={() => uploadProfileImage(currentUser.id, currentUser.avatar, document.querySelector('#profileImage').files[0])}
// > 
// { currentUser.avatar ? 'Upload New Image' : 'Upload' } 
// </button>