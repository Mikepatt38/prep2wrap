import React, { Component } from 'react'
import { Table } from '../General/Table'
import Modal from '../General/Modal'
import UserProfileModal from './UserProfileModal'
import Loading from "../General/Loading"
import Avatar from '../../img/avatar-placeholder-min.png'
import { FormTextInput } from '../Forms/FormTextInput'
import FormSelectInput from '../Forms/FormSelectInput'
import { locationObj, skillsObj, positionsObj, jobTypesObj } from '../../data/formOptions'
import GlassIcon from '../../img/icon-searchglass.svg'
import ActionIcon from '../../img/icon-action.svg'
import WarningIcon from '../../img/icon-warning.svg'

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
    resultsModalActive: false,
    user: {},
    searchActive: true,
    formError: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        data: this.props.users,
        loading: false,
        resultsModalActive: true
      })
    }
  }

  componentWillUnmount = () => {
    this.setState({
      searchName: '',
      positionsSelected: [],
      locationsSelected: [],
      jobTypesSelected: [],
    })
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive,
      searchName: '',
      positionsSelected: [],
      locationsSelected: [],
      jobTypesSelected: [],
    })
  }

  toggleResultsModal = () => {
    this.setState({
      resultsModalActive: !this.state.resultsModalActive,
      searchName: '',
      positionsSelected: [],
      locationsSelected: [],
      jobTypesSelected: [],
    })
  }

  toggleAllModals = () => {
    this.setState({
      modalActive: false,
      resultsModalActive: false,
      searchName: '',
      positionsSelected: [],
      locationsSelected: [],
      jobTypesSelected: [],
    })
  }

  validateUserSearch(){
    const { searchName, locationsSelected } = this.state
    if(!searchName.length && (locationsSelected.length === 0)) {
      return false
    }
    return true
  }

  handleUserSelected = (user) => {
    this.setState({
      user: user,
      modalActive: true
    })
  }

  handleSearchName = (e) => {
    this.setState({
      searchName: e.target.value,
      formError: false
    })
  }

  handleSelect = (name, val) => {
    this.setState({
      [name]: val,
      formError: false
    })
  }

  handleUpdateSearch = (e) => {
    e.preventDefault()
    console.log('validated: ' +  this.validateUserSearch())
    if(this.validateUserSearch()){
      this.setState({
        loading: true,
        searchActive: false
      })
      const { searchName, positionsSelected, locationsSelected, jobTypesSelected } = this.state
      this.props.usersSearch(searchName, positionsSelected, locationsSelected, jobTypesSelected)
    }
    else {
      this.setState({
        formError: true
      })
    }
  }
  
  
  tableFilter(state) {
    return (
      <form className="search-filter">
        <div className="search-filter-item">
          <FormTextInput 
            label="Crew Member's Name:"
            name="searchName"
            type="text"
            onChange={this.handleSearchName}
            value={this.state.searchName}
            placeholder="Enter the user's name"
            error={this.state.formError}
            errorMsg="Please enter a crew member name or select a location"
          />
        </div>
        <div className="search-filter-item">
          <FormSelectInput
            label="Select Location (max 1 location per search):"
            name="locationsSelected"
            options={locationObj}
            currentSkills={state.locationsSelected}
            placeholder="Select a Location"
            isMultiSelect={false}
            onSelect={this.handleSelect}
            isClearable={false}
            error={this.state.formError}
            errorMsg="Please enter a crew member name or select a location"
          />
        </div>
        <div className="search-filter-item">
          <hr />
          <p>To get more specific, filter your above choices by position or job types the crew member qualifies for.</p>
        </div>
        <div className="search-filter-item">
          <FormSelectInput
            label="Select Positions"
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
            label="Select Job Types"
            name="jobTypesSelected"
            options={jobTypesObj}
            currentSkills={this.state.jobTypesSelected}
            placeholder="Select Job Types"
            isMultiSelect={true}
            onSelect={this.handleSelect}
            isClearable={false}
          />
        </div>
        <div className="button-wrapper">
          <button 
            className="button-primary"
            onClick={(e) => this.handleUpdateSearch(e)}
          >
            <img src={GlassIcon} alt="Search Button Icon" />
            Search Crew
          </button>
        </div>
      </form>
    )
  }

  render() {

    const columns = [
      {
        id: 'Avatar', 
        Header: 'User',
        headerClassName: 'cell-avatar',
        Cell: props => props.original.avatarUrl 
          ? <img src={props.original.avatarUrl} alt="Profile Avatar" />
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
              <ul className="table-action">
                <li className="table-action-item" onClick={() => this.handleUserSelected(props.original)}>View Profile</li>
              </ul>
            </div>
          )
        }
      },
    ]
    
    return (
      <React.Fragment>
        <Modal
          active={this.state.resultsModalActive}
          title="User Search Results"
          children={ 
            this.props.loading ?
            <Loading /> : 
            <div className="modal-component">
              {
                this.state.data.length > 0 ?
                <Table
                  data={this.state.data}
                  columns={columns}
                  loading={this.state.loading}
                  close={this.toggleResultsModal}
                />
                : <p className="modal-message-warning"><span><img src={WarningIcon} alt="Warning message icon" /></span>There weren't any crew members matching your search.</p>
              }
            </div>    
          }
          close={this.toggleResultsModal}
        />
        <div className="modal-component modal-component-wide">
          <p>Create a crew member search by either entering a name and/or selecting a location(s).</p>
          <UserProfileModal
            currentUser={this.props.currentUser}
            updateUserFavorites={this.props.updateUserFavorites}
            active={this.state.modalActive}
            user={this.state.user}
            close={this.toggleModal}
            toggleAllModals={this.toggleAllModals}
          />
          {this.tableFilter(this.state)}
        </div>
      </React.Fragment>
    )
  }
}

export default UserSearchTable