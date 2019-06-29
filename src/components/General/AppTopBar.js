import React from 'react'
import { Link } from 'react-router-dom'
import MainLogo from '../../img/logo-white.png'
import Signout from '../../containers/SignOut'
import ProfileIcon from '../../img/icon-user.svg'

function AppTopBar(){
  return (
    <header className="app-topbar">
      <div className="logo">
        <img src={MainLogo} alt="White Prep 2 Wrap Logo" />
      </div>
      <ul className="links">
        <li><Link to="/account-settings"><img src={ProfileIcon} alt="Profile Icon" /></Link></li>
        <li><Signout /></li>
      </ul>
    </header>
  )
}

export default AppTopBar