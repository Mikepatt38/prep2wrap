import React, { Component } from 'react'

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <a>Home</a>
          </li>
          <li className="sidebar-nav-item">
            <a>Jobs</a>
          </li>
          <li className="sidebar-nav-item">
            <a>Users</a>
          </li>
          <li className="sidebar-nav-item">
            <a>Availability</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Sidebar