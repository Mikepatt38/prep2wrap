import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const tempStyle = {
  marginTop: '85px'
}

class Landing extends Component {

  render() {
    return (
      <div className="container" style={tempStyle}>
        <h1>Home Page</h1>
      </div>
    )
  }
}

export default Landing
