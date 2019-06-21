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
    jobTypesSelected: [],
    modalActive: false,
    user: {}
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  toggleRowActions(index){
    // store which row was selected
    const el = document.getElementById('row-user-0')
    const elAction = document.getElementById('action-user-0')
    // if there are rows that are active, lets find them
    const els = document.getElementsByClassName('row-actions-active')
    const elsAction = document.getElementsByClassName('action-hidden')
    console.log(els)
    // we need to remove this class if it is out there
    if(els[0] && els[0].id === `row-user-${index}`){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
    }
    else if(els[0]){
      els[0].classList.remove('row-actions-active')
      elsAction[0].classList.remove('action-hidden')
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
    //if there aren't any active, lets add the class
    else {
      el.classList.add('row-actions-active')
      elAction.classList.add('action-hidden')
    }
  }

  handleUserSelected = (user) => {
    this.setState({
      user: user,
      modalActive: true
    })
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
        <React.Fragment>
          <button 
            className="button-primary"
            onClick={(e) => this.handleUpdateSearch(e)}
          >
            <img src={GlassIcon} alt="Search Button Icon" />
          </button>
          <button 
            className="button-primary"
            onClick={() => this.props.close()}
          >
            cancel
          </button>
        </React.Fragment>
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
        Cell: props => <span>{props.original.profileInformation.location[0].value}</span>,
      }, 
      {
        id: 'Profile',
        Header: 'Action',
        headerClassName: 'cell-small',
        className: 'cell-small',
        Cell: props => {
          return (     
            <div className="action-container">
              <div 
                className="action" 
                onClick={() => this.toggleRowActions(0)} 
                id="action-user-0"
              >
                  <img src={ActionIcon} alt="Table Icon for Actions" />
              </div>
              <ul className="table-action-list" id="row-user-0">
                <li className="table-action-list-item" onClick={() => this.handleUserSelected(props.original)}>View Profile</li>
              </ul>
            </div>
          )
        }
      },
    ]
    
    return (
      <React.Fragment>
        <UserProfileModal
          active={this.state.modalActive}
          user={this.state.user}
          close={this.toggleModal}
        />
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