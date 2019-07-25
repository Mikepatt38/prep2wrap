import React, { Component } from 'react'
import SignoutIcon from '../../img/icon-logout.svg'

function Signout(props){

  async function handleSignOut(){
    alert('Are you sure you wish to logout?')
    let removeUser = await props.removeCurrentUser().then( () => {
      props.signUserOut()
    })
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