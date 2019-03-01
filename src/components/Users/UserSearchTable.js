import React, { Component } from 'react'
import UserProfileModal from './UserProfileModal'
import Avatar from '../../img/avatar-placeholder-min.png'

class Table extends Component {

  renderHeaders() {
    return (
      this.props.headers.map( (header) => {
        return <div className="table-header-col" key={header}>{header}</div>
      })
    )
  }

  renderRows(){
    let rows = []
    let cells = []
    let locations = []
    let available = ''
    this.props.value.map( (value, key) => {
      if( typeof value.profileInformation.location === 'undefined') {
        locations = ['Unknown']
      }
      else {
        locations = value.profileInformation.location.map ( (loc) => {
          return loc.label
        })
      }
      let userAvatar = value.profileInformation.avatarUrl 
      ? <img src={value.profileInformation.avatarUrl} alt="Profile Avatar" />
      : <img src={Avatar} alt="Profile Avatar Placeholder" />
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{userAvatar}</div>
          <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>
          <div className="table-row-cell">{locations.map( (location) => {return location})}</div>
          <div className="table-row-cell">{value.numberOfTimesFavorite}</div>  
          <div className="table-row-cell">
            <span onClick={() => {this.props.setUserModal(true, value)}}>View Profile</span>
          </div>       
        </React.Fragment>
      )
      rows.push(
        <div className="table-row table-rows-5" key={key}>
          {cells}
        </div>
      )
      cells = []
    })
    return <div className="table-body">{rows}</div>
  }

  render() {
    return (
      <div className="table">
        <div className="table-header table-rows-5">
          {this.renderHeaders()}
        </div>
          {this.renderRows()}
      </div>
    )
  }
}

export default Table