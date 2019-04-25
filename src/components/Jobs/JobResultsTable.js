import React, { Component } from 'react'
import {Table} from '../General/Table'
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
    columns: []
  }

  componentDidMount(){
    const columns = [
      {
        id: 'Avatar', // Required because our accessor is not a string
        Header: 'Crew Memeber',
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
        id: 'Assign', // Required because our accessor is not a string
        Header: 'Assign Position',
        className: 'cell-select',
        Cell: props => {
          const userPositions = this.createUserPositionsArr(props.original.profileInformation.positions)
          const userRowDisabled = this.state.usersAssigned.find( (item) => {
            return item.id === props.original.id
          })
          const key = props.index
          {
            return <select
              onChange={(e) => { this.handleSelectPosition(props.original, key, e)} }
              disabled={userRowDisabled === undefined ? false : true}
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
        Cell: props => <span className="view-profile" onClick={() => {this.props.setUserModal(true, props.original)}}><img src={LinkIcon} alt="Table Link Icon" />View Profile</span>
      },
    ]
    this.setState({
      data: this.props.results,
      columns: columns
    })
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
          status: "review",
          jobType: "invited",
          jobID: this.props.jobID,
          jobName: this.props.jobData.jobName,
          jobCreatorID: this.props.jobData.jobCreatorID,
          jobDates: this.props.jobData.jobDates,
          jobLocation: this.props.jobData.jobLocation,
          jobContactEmail: this.props.jobData.jobContactEmail,
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

  tableFilter = () => {
    return (
      <div className="table-filter">
        <label>Filter the Results:</label><div></div>
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
        <div className="app-page-section">
          <div className="create-job-wrapper">
            <div className="create-job-wrapper-main">
              <div className="card card-create-job no-hover">
                <h3>Crew Job Matches</h3>
                {this.tableFilter()}
                <Table
                  data={this.state.data}
                  columns={this.state.columns}
                  loading={this.state.loading}
                />
              </div>
            </div>
            <div className="create-job-wrapper-sidebar">
              <div className="card card-create-job no-hover">
                <h3>Assigned User Positions</h3>
                {this.renderAssignedUsers()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default JobResultsTable

// <div className="app-page-section">
// {this.renderAssignedUsers()}
// {this.tableFilter()}
// <div className="section-title">
//   <h3>Search Results:</h3>
//   <hr />
// </div>
// <div className="list-rows">
//   {this.renderRows()}
// </div>
// </div>


// renderHeaders() {
//   const headers = ['Name']
//   return (
//     <div className="table-list-header table-list-cols-2">

//     </div>
//   )
// }

// renderRows(){
//   let rows = []
//   let cells = []
//   let userPositions = [] 
//   this.state.usersReturned.map( (value, key) => {
//     const userPositions = this.createUserPositionsArr(this.props.positions) // change back to value.profileInformation.positions after design
//     const userRowDisabled = this.state.usersAssigned.find( (item) => {
//       return item.id === value.id
//     })
//     let userAvatar = value.profileInformation.avatarUrl 
//       ? <img src={value.profileInformation.avatarUrl} alt="Profile Avatar" />
//       : <img src={Avatar} alt="Profile Avatar Placeholder" />
//     cells.push(
//       <React.Fragment key={key}>
//         <div className="list-row-cell">{userAvatar} {value.firstName + ' ' + value.lastName}</div> 
//         <div className="list-row-cell">Favorited by {value.numberOfTimesFavorite} Users</div>
//         <div className="list-row-cell"> <span className="list-row-link" onClick={() => {this.props.setUserModal(true, value)}}>View Profile<img src={LinkIcon} alt="Table Link Icon" /></span> </div> 
//         <div className="list-row-cell cell-right">
//           <select
//             onChange={(e) => { this.handleSelectPosition(value, key, e)} }
//             disabled={userRowDisabled === undefined ? false : true}
//             id={"select"+key}
//             key={"select"+key}
//           >
//             <option value="" disabled selected>Assign a position</option>
//             { userPositions.map( position => {
//               let positionFilled = this.state.assignedPositions.includes(position)
//               return <option 
//                 key={position + key}
//                 value={position}
//                 disabled={positionFilled}
//                 >
//                   {position}
//               </option>               
//             })}
//           </select>
//         </div>       
//       </React.Fragment>
//     )
//     rows.push(
//       <div className={userRowDisabled === undefined ? 'list-row list-cols-2' : 'list-row list-row-cols-2 assigned'} key={key}>
//         {cells}
//       </div>
//     )
//     cells = []
//   })
//   return <div className="list-rows">{rows}</div>
// } 