import React, { Component } from 'react'
import SignoutIcon from '../../img/icon-logout.svg'

function Signout(props){

  async function handleSignOut(){
    if(window.confirm('Are you sure you wish to logout?')) {
      return await props.removeCurrentUser().then( () => {
        props.signUserOut()
      })
    }
    else {
      return null
    }
  }

  return(
    <button 
      className="signout"
      onClick={() => handleSignOut()} >
      <img src={SignoutIcon} alt="Signout Icon" />
    </button>
  )
}

export default Signout