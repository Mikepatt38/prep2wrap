import React, { Component } from 'react'
import Avatar from '../../img/avatar-placeholder-min.png'
import LinkIcon from '../../img/icon-getting-started.svg'

class JobResultsTable extends Component {

  state = {
    usersAssigned: [],
    openPositions: this.props.positions,
    assignedPositions: [],
    usersReturned: this.props.results,
    allUsers: this.props.results,
    searchByNameTerm: ''
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
          status: "pending",
          jobType: "invited",
          jobID: this.props.jobID,
          jobName: this.props.jobName,
          jobCreatorID: this.props.jobCreatorID
        }
      ],
      assignedPositions: [...this.state.assignedPositions, position]
    }),
    () => {
      this.props.assignPosition(this.state.usersAssigned)
    })
  }

  removeAssignedUser = (user) => {
    let tempArr = this.state.usersAssigned
    let tempPos = this.state.assignedPositions
    tempArr.map( (item, key) => {
      return item = {
        id: user.id ? tempArr.splice(key, 1) : null,
        position: user.position ? tempPos.splice(key, 1) : null
      }
      // item.id === user.id ? tempArr.splice(key, 1) : null
      // item.position === user.position ? tempPos.splice(key, 1) : null
    })
    this.setState({
      usersAssigned: tempArr,
    })
  }

  handleSelectPosition(user, key, e) {
    const position = e.target.value
    let selectOptions = document.getElementById("select"+key).options[0].selected = true
    this.addUser(user, position)
  }

  renderHeaders() {
    const headers = ['Name']
    return (
      <div className="table-list-header table-list-cols-2">

      </div>
    )
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

  renderRows(){
    let rows = []
    let cells = []
    let userPositions = [] 
    this.state.usersReturned.map( (value, key) => {
      const userPositions = this.createUserPositionsArr(value.profileInformation.positions)
      const userRowDisabled = this.state.usersAssigned.find( (item) => {
        return item.id === value.id
      })
      let userAvatar = value.profileInformation.avatarUrl 
        ? <img src={value.profileInformation.avatarUrl} alt="Profile Avatar" />
        : <img src={Avatar} alt="Profile Avatar Placeholder" />
      cells.push(
        <React.Fragment key={key}>
          <div className="list-row-cell">{userAvatar} {value.firstName + ' ' + value.lastName}</div> 
          <div className="list-row-cell">Favorited by {value.numberOfTimesFavorite} Users</div>
          <div className="list-row-cell"> <span className="list-row-link" onClick={() => {this.props.setUserModal(true, value)}}>View Profile<img src={LinkIcon} alt="Table Link Icon" /></span> </div> 
          <div className="list-row-cell cell-right">
            <select
              onChange={(e) => { this.handleSelectPosition(value, key, e)} }
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
          </div>       
        </React.Fragment>
      )
      rows.push(
        <div className={userRowDisabled === undefined ? 'list-row list-cols-2' : 'list-row list-row-cols-2 assigned'} key={key}>
          {cells}
        </div>
      )
      cells = []
    })
    return <div className="list-rows">{rows}</div>
  } 

  renderAssignedUsers = () => {
    return (
      <div className="assignedUsers">
        <h4>Positions Assigned:</h4>
        <ul className="assignedUsers-list">
          {
            this.state.usersAssigned.map( (user, key) => {
              return <li onClick={() => this.removeAssignedUser(user)} key={key}><p><span>{user.position}:</span> {user.name}</p></li>
            })
          }
        </ul>
      </div>
    )
  }

  filterTableByPosition = (userPosition) => {
    const position = userPosition
    let results = []

    const getFilterResults = new Promise( (resolve, reject) => {
      try {
        this.props.results.map( result => {
          let isMatch = false
          result.positions.map( resultPosition => {
            if(resultPosition.value === position) {
              isMatch = true
            }
          })
          if(isMatch === true) {
            results.push(result)
          }
          isMatch = false
        })
        resolve(results)
      } catch(error) {
        reject(results)
      }
    })
    return getFilterResults
  }

  handleTableFilter = async (e, filterBy) => {
    const position = e.target.value
    switch(filterBy) {
      case "position": 
        const result = await this.filterTableByPosition(position)
        this.setState({
          usersReturned: result
        })
        break
    }
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
      usersReturned: filterResults
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
      usersReturned: searchResults,
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
            onChange={(e) => { this.handleFilterByPosition(e)} }
          >
            <option value="" disabled selected>Filter by Position</option>
            { this.props.positions.map( position => {
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
      <div className="app-page-section">
        {this.renderAssignedUsers()}
        {this.tableFilter()}
        <div className="section-title">
          <h3>Search Results:</h3>
          <hr />
        </div>
        <div className="list-rows">
          {this.renderRows()}
        </div>
      </div>
    )
  }
}

export default JobResultsTable