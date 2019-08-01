import React, { Component } from 'react'
import { Table } from '../General/Table'
import UserProfileModal from '../Users/UserProfileModal'
import Avatar from '../../img/avatar-placeholder-min.png'
import LinkIcon from '../../img/icon-profile.svg'
import TrashIcon from '../../img/icon-trash.svg'

class JobResultsTable extends Component {

  state = {
    usersAssigned: [],
    openPositions: this.props.jobData.jobPositions,
    assignedPositions: [],
    usersReturned: this.props.results,
    allUsers: this.props.results,
    searchByNameTerm: '',
    data: [],
    columns: [],
    modalActive: false,
    user: {}
  }

  componentDidMount(){
    const columns = [
      {
        id: 'Avatar', // Required because our accessor is not a string
        Header: 'Name',
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
        // headerClassName: 'cell-medium',
        Cell: props => <span>{props.original.profileInformation.location[0].value}</span>,
        // className: 'cell-medium'
      }, 
      {
        id: 'Available', // Required because our accessor is not a string
        Header: 'Availability',
        // accessor: 'availabol.value',
        Cell: props => {
          let userAvailability = props.original.availability ? props.original.availability : []
          return (
            this.checkUserAvailability(userAvailability)
          )
        },
        filterable: false,
        sortable: false
      },
      {
        id: 'Assign', // Required because our accessor is not a string
        Header: 'Assign Position',
        className: 'cell-select',
        Cell: props => {
          const userPositions = this.createUserPositionsArr(props.original.profileInformation.positions)
          const userRowDisabled = this.state.usersAssigned.find( (item) => {
            return item.id === props.original.id
          })
          const isUserUnavailable = props.original.availability 
            ? props.original.availability.some(date => this.props.jobData.jobDates.includes(date.date)) ? true : false
            : false
          const key = props.index
          {
            return <select
              onChange={(e) => { this.handleSelectPosition(props.original, key, e)} }
              disabled={userRowDisabled !== undefined || isUserUnavailable ? true : false}
              id={"select"+key}
              key={"select"+key}
            >
              <option value="" disabled selected>Assign a position</option>
              { userPositions.map( position => {
                let positionFilled = this.state.assignedPositions.includes(position)
                return <option 
                  key={position + key}
                  value={position}
                  disabled={positionFilled}
                  >
                    {position}
                </option>               
              })}
            </select>
          }
        }        
      },
      {
        id: 'Profile', // Required because our accessor is not a string
        Header: '',
        className: 'cell-end',
        Cell: props => <span className="cell-status view-profile" onClick={() => {this.handleUserSelected(props.original)}}>View User Profile</span>
      },
    ]
    this.setState({
      data: this.props.results,
      columns: columns
    })
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  checkUserAvailability(userAvailability) {
    return userAvailability.some(date => this.props.jobData.jobDates.includes(date.date))
    ? <span className="cell-status unavailable">Unavailable</span>
    : <span className="cell-status available">Available</span>
  }

  addUser = (user, position) => {
    this.setState( prevState => ({
      usersAssigned: [
        ...prevState.usersAssigned,
        {
          name: user.firstName + ' ' + user.lastName,
          position: position,
          id: user.id,
          number: user.mobileNumber,
          status: "Review",
          jobType: "invited",
          jobID: this.props.jobID,
          jobName: this.props.jobData.jobName,
          jobCreatorID: this.props.jobData.jobCreatorID,
          jobDates: this.props.jobData.jobDates,
          jobLocation: this.props.jobData.jobLocation,
          jobContactEmail: this.props.jobData.jobContactEmail,
          jobCreatorNumber: this.props.jobData.jobCreatorNumber,
          jobDescription: this.props.jobData.jobDesc
        }
      ],
      assignedPositions: [...this.state.assignedPositions, position],
    }),
    () => {
      this.props.assignPosition(this.state.usersAssigned)
    })
  }

  removeAssignedUser = (user) => {
    let tempArr = this.state.usersAssigned
    let tempPos = this.state.assignedPositions
    tempArr.map( (item, key) => {
      return (
        item.id === user.id ? tempArr.splice(key, 1) : null,
        item.position === user.position ? tempPos.splice(key, 1) : null
      )
    })
    this.setState({
      usersAssigned: tempArr
    })
  }

  handleSelectPosition(user, key, e) {
    const position = e.target.value
    let selectOptions = document.getElementById("select"+key).options[0].selected = true
    this.addUser(user, position)
  }

  createUserPositionsArr(positions){
    let arr = []
    positions.map( position => {
      if(this.state.openPositions.includes(position.value)){
        arr.push(position.value)
      }
    })
    return arr
  }

  renderAssignedUsers = () => {
    return (
      <div className="assignedUsers">
        <ul className="assignedUsers-list">
          {
            this.state.usersAssigned.map( (user, key) => {
              return (
                <div key={key} className="assignedUsers-list-item">
                  <label>{user.position}:</label>
                  <span className="assignedUsers-list-item-user"><li className="assignedUsers-list-pill">{user.name}</li><span className="assignedUsers-list-delete" onClick={() => this.removeAssignedUser(user)}><img src={TrashIcon} alt="Delete Icon" /></span></span>
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }

  handleFilterByPosition = (e) => {
    const selectedPosition = e.target.value
    let filterResults = []

    this.props.results.map( result => {
      let isMatch = false
      result.profileInformation.positions.map( resultPosition => {
        if(resultPosition.value === selectedPosition) {
          isMatch = true
        }
      })
      if(isMatch){ filterResults.push(result) }
    })
    this.setState({
      data: filterResults
    })
  }

  handleFilterByName = (e) => {
    const searchTerm = e.target.value
    let searchResults = []
    
    this.props.results.map( result => {
      if(searchTerm.toLowerCase().includes(result.firstName.toLowerCase()) || searchTerm.toLowerCase().includes(result.lastName.toLowerCase())
      || result.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || result.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchResults.push(result)
      }
    })
    this.setState({
      data: searchResults,
    })
  }

  handleUserSelected = (user) => {
    this.setState({
      user: user,
      modalActive: true
    })
  }

  tableFilter = () => {
    return (
      <div className="table-filter">
        <div className="table-filter-cell">
          <form className="table-filter-search">
            <input 
              type="text"
              onChange={this.handleFilterByName}
              placeholder="Search User By Name"
              className="table-search"
            />
          </form>
        </div>
        <div className="table-filter-cell">
          <select
            onChange={this.handleFilterByPosition}
          >
            <option value="" disabled selected>Filter by Position</option>
            { this.props.jobData.jobPositions.map( position => {
              return <option 
                key={position}
                value={position}
                >
                  {position}
              </option>               
            })}
          </select>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>

        <UserProfileModal
          active={this.state.modalActive}
          user={this.state.user}
          close={this.toggleModal}
          currentUser={this.props.currentUser}
        />
        <div className="app-page-section app-page-section--spacing">
          <p>These are the positions you are still needing to send an invite for.</p>
          <ul className="unassigned-jobs">
            {
              this.state.openPositions.map( (position, key) => {
                return this.state.assignedPositions.includes(position) ? <li className="position-filled" key={key}>{position}</li> : <li className="position-open" key={key}>{position}</li>
              })
            }
          </ul>
        </div>

        <div className="app-page-section app-page-section--spacing">
          <p>These are your current invited crew and their position.</p>
          {this.props.error && <p className="error-message">Please assign at least one position before continuing.</p>}
          <ul className="assigned-jobs">
            {
              this.state.usersAssigned.map( (user, key) => {
                return (
                  <li key={key}>
                    <label>{user.position}:</label>
                    <span className="assigned-jobs-item">{user.name}<span onClick={() => this.removeAssignedUser(user)}><img src={TrashIcon} alt="Delete Icon" /></span></span>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="app-page-section app-page-section--spacing">
          <p>Filter through crew members to assign them to be invited for positions on your crew.</p>
          {this.tableFilter()}
          <Table
            data={this.state.data}
            columns={this.state.columns}
            loading={this.state.loading}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default JobResultsTable

