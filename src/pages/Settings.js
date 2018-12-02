import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormTextInput } from '../components/FormTextInput'
import { FormButton } from '../components/FormButton'
import UserProfileForm, { ProfileDisplayed } from '../components/UserProfileForm'
import UserInfoForm from '../components/UserInfoForm'
import { ProfileImageUpload } from '../components/ProfileImageUpload'

class AccountSettings extends Component {
  state = {
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName,
    email: this.props.currentUser.email,  
    mobileNumber: this.props.currentUser.mobileNumber
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { firstName, lastName, email, mobileNumber } = this.state
    const { currentUser, setModal, setName, setEmail, setMobileNumber, setUserProfile, uploadProfileImage } = this.props
    return (
      <div className="container containerMargin">
        <div className="card">
          <div className="card-header">
            <h3>Basic Details</h3>
            <p>Your basic account information, you can update this information at any time to keep your account up to date.</p>    
          </div>
          <div className="card-body">
            <form
              method="form"
              className="card-form-userName"
            >
              <FormTextInput
                label="First Name"
                name="firstName"
                type="text"
                onChange={this.handleChange}
                className="form-group--half"
                value={firstName}
              />
              <FormTextInput
                label="Last Name"
                name="lastName"
                type="text"
                onChange={this.handleChange}
                className="form-group--half"
                value={lastName}
              />
              <FormTextInput
                label="email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={email}
              />
              <div className="button-wrapper">
                <FormButton
                  onClick={(e) => setName(this.props.currentUser.id, firstName, lastName, e)}
                  className="button-form"
                  buttonText="Update"
                />
              </div>
            </form> 
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Profile Settings</h3>
            <p>Update your profile settings at any time to keep your profile up to date for potential connections.</p>
          </div>
          <div className="card-body">
            <UserProfileForm 
              setUserProfile={setUserProfile} 
              currentUser={currentUser} 
            />
          </div>
        </div>
      </div>
    )
  }
}

// const AccountSettings = ({ currentUser, setModal, setName, setEmail, setMobileNumber, setUserProfile, uploadProfileImage  }) => {
//   return (
//     <div className="container">
//       <div className="settings">

//         <div style={styles}>
//           <div className="card">
//             <div className="card-header">
//               <h2 className="card-title">Basic Information</h2>
//               <p className="card-subtitle">Your basic account information, hover over the text to update the field.</p>
//             </div>
//             <div className="card-item">
//               <div className="card-item-info">
//                 <label>Account Profile Image: </label>
//                 { currentUser.avatar ? <img src={currentUser.avatar} alt="User Profile Image" /> : <p>Upload a profile image</p> }
//               </div>
//               <span><a role="button" onClick={() => setModal(true, currentUser.avatar ? 'Edit your profile image.' : 'Upload your profile image.' , 
//                 <ProfileImageUpload currentUser={currentUser} uploadProfileImage={uploadProfileImage} />)}>{ currentUser.avatar ? 'Edit' : 'Upload' }</a>
//               </span>
//             </div>
//             <div className="card-item">
//               <div className="card-item-info">
//                 <label>Account Name: </label>
//                 <p> {currentUser.firstName} {currentUser.lastName}</p>
//               </div>
//               <span><a role="button" onClick={() => setModal(true, "Update account name", 
//                 <UserInfoForm setName={setName} setMobileNumber={null} setEmail={null} currentUser={currentUser} />)}>Edit</a>
//               </span>
//             </div>
//             <div className="card-item">
//               <div className="card-item-info">
//                 <label>Account Email: </label>
//                 <p> {currentUser.email}</p>
//               </div>
//               <span><a role="button" onClick={() => setModal(true, "Update account email", 
//                 <UserInfoForm setName={null} setMobileNumber={null} setEmail={setEmail} currentUser={currentUser} />)}>Edit</a>
//               </span>
//             </div>
//             <div className="card-item">
//               <div className="card-item-info">
//                 <label>Primary Mobile Number: </label>
//                 <p> {currentUser.mobileNumber}</p>
//               </div>
//               <span><a role="button" onClick={() => setModal(true, "Update account mobile number", 
//                 <UserInfoForm setName={null} setEmail={null} setMobileNumber={setMobileNumber} currentUser={currentUser} />)}>Edit</a>
//               </span>
//             </div>
//           </div>
//         </div>

//         <div style={styles}>
//           <div className="card">
//             <div className="card-header">
//               <h2 className="card-title">User Profile</h2>
//               <p className="card-subtitle">Your public profile information, it can be updated at any time.</p>
//             </div>
//             <div className="card-item">
//               <ProfileDisplayed currentUser={currentUser} />
//               <span><a role="button" onClick={() => setModal(true, "Update profile information", 
//                 <UserProfileForm setUserProfile={setUserProfile} currentUser={currentUser} />)}>Edit</a>
//               </span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>   
//   )
// }

AccountSettings.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  })
}

export default AccountSettings