import React, { Component } from 'react'
import UserProfileModal from './UserProfileModal'
import { mapPropsStreamWithConfig } from 'recompose';

class JobResultsTable extends Component {

  state = {
    usersAssigned: [],
    openPositions: this.props.positions,
    assignedPositions: []
  }

  isUserAssigned = (user, position) => {
    return new Promise( (resolve, reject) => {
      try {
        const userArr = [user, position]

        const contains = this.state.usersAssigned.find( (item) => {
          return item[0].id === userArr[0]
        }) 
          contains === undefined 
            ? resolve(false)
            : resolve(true)
      }
      catch(error) {
        reject(error)
      }
    })
  }

  addUser = (user, position) => {
    this.setState( prevState => ({
      usersAssigned: [
        ...prevState.usersAssigned,
        [user, position]
      ],
      assignedPositions: [...this.state.assignedPositions, position]
    }),
    () => {
      this.props.assignPosition(this.state.usersAssigned)
    })
  }

  removeUser = (user, position) => {
    let tempArr = this.state.usersAssigned
    const positions = this.state.assignedPositions
    const positionIndex = positions.indexOf(position)
    console.log(positions)
    return new Promise( (resolve, reject) => {
      try {
        if(positionIndex !== -1) {
          positions.splice(positionIndex)
        }
        tempArr.map( (item, key) => {
          item[key].id === user.id ? tempArr.splice(key, 1) : null
        })
        this.setState({
          usersAssigned: tempArr,
          assignedPositions: positions
        },
        () => {
          console.log(this.state.assignedPositions)
          this.props.assignPosition(this.state.usersAssigned)
        })
        resolve()
      }
      catch(error){
        reject(error)
      }
    })
  }

  handleSelectPosition(user, e) {
    const position = e.target.value
    
    this.isUserAssigned(user.id, position)
      .then( (result) => {
        console.log(result)
        result 
          ? this.removeUser(user, position)
              .then( this.addUser(user, position) ) 
          : this.addUser(user, position)
      })
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
    this.props.results.map( (value, key) => {
      const userPositions = value.positions.map( userPosition => {
        if(this.state.openPositions.includes(userPosition.value)) {
          return userPosition.value
        }
      })
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>  
          <div className="table-row-cell cell-centered">
            <span onClick={() => {this.props.setUserModal(true, value)}}>View Profile</span>
          </div>
          <div className="table-row-cell cell-centered">
            <select
              onChange={(e) => { this.handleSelectPosition(value, e)} }
            >
              <option default value="null">Assign a position</option>
              { userPositions.map( position => {
                let positionFilled = this.state.assignedPositions.includes(position)
                return <option 
                  key={position}
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
        <div className="table-row table-row--jobResults" key={key}>
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
              return <li key={key}>{user[0].firstName + ' ' + user[0].lastName} assigned as {user[1]}</li>
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAssignedUsers()}
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