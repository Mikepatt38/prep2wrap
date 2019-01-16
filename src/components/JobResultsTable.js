import React, { Component } from 'react'
import UserProfileModal from './UserProfileModal'

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
          status: "pending"
        }
        // [user.firstName + ' ' + user.lastName, position, user.id]
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
      item.id === user.id ? tempArr.splice(key, 1) : null
      item.position === user.position ? tempPos.splice(key, 1) : null
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
      headers.map( (header) => {
        return <div className="table-header-col" key={header}>{header}</div>
      })
    )
  }

  renderRows(){
    let rows = []
    let cells = []
    this.state.usersReturned.map( (value, key) => {
      const userPositions = value.positions.map( userPosition => {
        if(this.state.openPositions.includes(userPosition.value)) {
          return userPosition.value
        }
      })
      const userRowDisabled = this.state.usersAssigned.find( (item) => {
        return item.id === value.id
      })
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>  
          <div className="table-row-cell cell-centered">
            <button
              disabled={userRowDisabled === undefined ? false : true}
              onClick={() => {this.props.setUserModal(true, value)}}>View Profile
            </button>
          </div>
          <div className="table-row-cell cell-centered">
            <select
              onChange={(e) => { this.handleSelectPosition(value, key, e)} }
              disabled={userRowDisabled === undefined ? false : true}
              id={"select"+key}
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
          <div className="table-row-cell cell-right">
            
          </div>       
        </React.Fragment>
      )
      rows.push(
        <div className={userRowDisabled === undefined ? 'table-row table-row--jobResults' : 'table-row table-row--jobResults assigned'} key={key}>
          {cells}
        </div>
      )
      cells = []
    })
    return <div className="table-body">{rows}</div>
  } 

  renderAssignedUsers = () => {
    return (
      <div className="assignedUsers">
        <h4>Assigned Users and Positions</h4>
        <ul className="assignedUsers-list">
          {
            this.state.usersAssigned.map( (user, key) => {
              return <li onClick={() => this.removeAssignedUser(user)} key={key}>{user.name} assigned as {user.position}</li>
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

  filterTableByName = async (e) => {
    e.preventDefault()
    const userName = this.state.searchByNameTerm
    let results = []

    const getFilterResultsByName = new Promise( (resolve, reject) => {
      try {
        this.props.results.map( result => {
          if(userName.toLowerCase().includes(result.firstName.toLowerCase()) || userName.toLowerCase().includes(result.lastName.toLowerCase())
            || result.firstName.toLowerCase().includes(userName.toLowerCase()) || result.lastName.toLowerCase().includes(userName.toLowerCase())
          ) {
            results.push(result)
          }
        })
        resolve(results)
      }
      catch(error) {
        reject(error)
      }
    })
    const users = await getFilterResultsByName
    this.setState({
      usersReturned: users,
      searchByNameTerm: ''
    })
  }

  handleSearchTermChange = e => {
    const value = e.target.value
    this.setState({
      searchByNameTerm: value
    })
  }

  tableFilter = () => {
    return (
      <div className="table-filter">
        <div className="table-filter-cell">
          <p>Filter Results by:</p>
        </div>
        <div className="table-filter-cell">
          <form className="table-filter-searchByName">
            <input 
              type="text"
              value={this.state.searchByNameTerm}
              onChange={this.handleSearchTermChange}
            />
            <button 
              className="button-inline"
              onClick={(e) => this.filterTableByName(e)}>
              Search
            </button>
          </form>
        </div>
        <div className="table-filter-cell">
          <select
            onChange={(e) => { this.handleTableFilter(e, "position")} }
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
      <React.Fragment>
        {this.renderAssignedUsers()}
        {this.tableFilter()}
        <div className="table">
          <div className="table-header table-header-users">
            {this.renderHeaders()}
          </div>
            {this.renderRows()}
        </div>
      </React.Fragment>
    )
  }
}

export default JobResultsTable