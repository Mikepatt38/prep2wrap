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
import ActionIcon from '../../img/icon-action.svg'

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
        data: this.props.users,
        loading: false
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
    this.setState({
      loading: true,
    })
    const { searchName, positionsSelected, locationsSelected, jobTypesSelected } = this.state
    this.props.usersSearch(searchName, positionsSelected, locationsSelected, jobTypesSelected)
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
        id: 'Avatar', 
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
        id: 'Location', 
        Header: 'Main Location',
        // headerClassName: 'cell-medium',
        Cell: props => <span>{props.original.profileInformation.location[0].value}</span>,
        // className: 'cell-medium'
      }, 
      {
        id: 'Profile',
        Header: 'Action',
        headerClassName: 'cell-small',
        className: 'cell-small',
        Cell: props => <span className="action" onClick={() => {this.props.setUserModal(true, props.original)}}><img src={ActionIcon} alt="Take Action Icon" /></span>
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