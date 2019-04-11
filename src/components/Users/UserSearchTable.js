import React, { Component } from 'react'
import { Table } from '../General/Table'
import UserProfileModal from './UserProfileModal'
import Avatar from '../../img/avatar-placeholder-min.png'
import { FormTextInput } from '../Forms/FormTextInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { FormButton } from '../Forms/FormButton'
import DownArrowIcon from '../../img/icon-down-arrow.svg'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'
import GlassIcon from '../../img/icon-searchglass.svg'
import LinkIcon from '../../img/icon-profile.svg'

class UserSearchTable extends Component {
  state = {
    data: [],
    columns: [],
    loading: false,
    searchName: '',
    positionsSelected: [],
    locationsSelected: [],
    jobTypesSelected: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        data: this.props.users
      })
    }
  }

  handleSearchName = (e) => {
    this.setState({
      searchName: e.target.value
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

  handleUpdateSearch = (e) => {
    e.preventDefault()
    this.props.usersSearch(this.state.searchName)
    this.setState({
      searchName: ''
    })
  }
  
  tableFilter() {
    return (
      <div className="search-filter">
        <div className="search-filter-item">
          <FormTextInput 
            // label="Enter User Name"
            name="searchName"
            type="text"
            onChange={this.handleSearchName}
            value={this.state.searchName}
            placeholder="Enter the user's name"
          />
        </div>
        <div className="search-filter-item">
          <FormSelectInput
            // label="Select Positions"
            name="positionsSelected"
            options={positionsObj}
            currentSkills={this.state.positionsSelected}
            placeholder="Select Positions"
            isMultiSelect={true}
            onSelect={this.handleSelect}
            isClearable={false}
          />
        </div>
        <div className="search-filter-item">
          <FormSelectInput
            // label="Select Locations"
            name="locationsSelected"
            options={locationObj}
            currentSkills={this.state.locationsSelected}
            placeholder="Select Locations"
            isMultiSelect={true}
            onSelect={this.handleSelect}
            isClearable={false}
          />
        </div>
        <div className="search-filter-item">
          <FormSelectInput
            // label="Select Job Types"
            name="jobTypesSelected"
            options={jobTypesObj}
            currentSkills={this.state.jobTypesSelected}
            placeholder="Select Job Types"
            isMultiSelect={true}
            onSelect={this.handleSelect}
            isClearable={false}
          />
        </div>
        <button 
          className="button-primary"
          onClick={(e) => this.handleUpdateSearch(e)}
        >
          <img src={GlassIcon} alt="Search Button Icon" />
        </button>
      </div>
    )
  }

  render() {

    const columns = [
      {
        id: 'Avatar', // Required because our accessor is not a string
        Header: 'User',
        headerClassName: 'cell-avatar',
        Cell: props => props.original.profileInformation.avatarUrl 
          ? <img src={props.original.profileInformation.avatarUrl} alt="Profile Avatar" />
          : <img src={Avatar} alt="Profile Avatar Placeholder" />,
        className: 'cell-avatar'
      },
      {
        Header: '',
        Cell: props => <span>{props.original.firstName + ' ' + props.original.lastName}</span>,
      }, 
      {
        id: 'Profile', // Required because our accessor is not a string
        Header: '',
        className: 'cell-end',
        Cell: props => <span className="view-profile" onClick={() => {this.props.setUserModal(true, props.original)}}><img src={LinkIcon} alt="Table Link Icon" />View Profile</span>
      },
    ]
    return (
      <React.Fragment>
        {this.tableFilter()}
        <Table
          data={this.state.data}
          columns={columns}
          loading={this.state.loading}
        />
      </React.Fragment>
    )
  }
}

export default UserSearchTable



// renderHeaders() {
//   return (
//     this.props.headers.map( (header) => {
//       return <div className="table-header-col" key={header}>{header}</div>
//     })
//   )
// }



// renderRows(){
//   let rows = []
//   let cells = []
//   let locations = []
//   let available = ''
//   this.props.value.map( (value, key) => {
//     if( typeof value.profileInformation.location === 'undefined') {
//       locations = ['Unknown']
//     }
//     else {
//       locations = value.profileInformation.location.map ( (loc) => {
//         return loc.label
//       })
//     }
//     let userAvatar = value.profileInformation.avatarUrl 
//     ? <img src={value.profileInformation.avatarUrl} alt="Profile Avatar" />
//     : <img src={Avatar} alt="Profile Avatar Placeholder" />
//     cells.push(
//       <React.Fragment key={key}>
//         <div className="table-row-cell">{userAvatar}</div>
//         <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>
//         <div className="table-row-cell">{locations.map( (location) => {return location})}</div>
//         <div className="table-row-cell">
//           <span onClick={() => {this.props.setUserModal(true, value)}}>View Profile</span>
//         </div>       
//       </React.Fragment>
//     )
//     rows.push(
//       <div className="table-row table-rows-5" key={key}>
//         {cells}
//       </div>
//     )
//     cells = []
//   })
//   return <div className="table-body">{rows}</div>
// }