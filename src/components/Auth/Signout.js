import React, { Component } from 'react'
import SignoutIcon from '../../img/icon-logout.svg'

function Signout(props){

  async function handleSignOut(){
    let removeUser = await props.removeCurrentUser()
    if(removeUser) props.signUserOut()
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