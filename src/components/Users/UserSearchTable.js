import React, { Component } from 'react'
import UserProfileModal from './UserProfileModal'
import Avatar from '../../img/avatar-placeholder-min.png'
import { FormTextInput } from '../Forms/FormTextInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import DownArrowIcon from '../../img/icon-down-arrow.svg'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'

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
      <UserSearchTableFilter />
      // <div className="table">
      //   <div className="table-header table-rows-5">
      //     {this.renderHeaders()}
      //   </div>
      //     {this.renderRows()}
      // </div>
    )
  }
}

export default Table

class UserSearchTableFilter extends Component {
  state = {
    firstName: '',
    lastName: '',
    positions: [],
    location: [],
    skills: [],
    jobTypes: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelect = (name, val) => {
    const newArr = val
    let tempArr = []
    newArr.map( value => {
      tempArr.push(value.value)
    })
    this.setState({
      [name]: val,
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.searchUsersByName(this.state.firstName, this.state.lastName)
    this.setState({
      firstName: '',
      lastName: ''
    })
  }

  handleAdditionalFilters = () => {
    const element = document.getElementById('extra-filters')
    element.classList.contains('open') ? element.classList.remove('open') : element.classList.add('open')

  }

  render() {
    const { firstName, lastName, positions, location, skills, jobTypes  } = this.state

    return (
      <form
        method="form"
        className="table-form"
      >
        
      </form>
    )
  }
}