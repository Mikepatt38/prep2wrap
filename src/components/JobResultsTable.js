import React, { Component } from 'react'
import UserProfileModal from './UserProfileModal'

class JobResultsTable extends Component {

  state = {
    usersAssigned: [],
    openPositions: []
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
      ]
    }))
  }

  removeUser = (user) => {
    let tempArr = this.state.usersAssigned
    return new Promise( (resolve, reject) => {
      try {
        tempArr.map( (item, key) => {
          item[key].id === user.id ? tempArr.splice(key, 1) : null
        })
        this.setState({
          usersAssigned: tempArr
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
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>  
          <div className="table-row-cell cell-centered">
            <span onClick={() => {this.props.setUserModal(true, value)}}>View Profile</span>
          </div>
          <div className="table-row-cell cell-right">
            <select
              onChange={(e) => { this.handleSelectPosition(value, e)} }
            >
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

  render() {
    return (
      <div className="table">
        <div className="table-header table-header-users">
          {this.renderHeaders()}
        </div>
          {this.renderRows()}
          {this.state.usersAssigned.map( (item, key) => {
            return <p key={key}>{item[0].id} {item[1]}</p>
          })}
      </div>
    )
  }
}

export default JobResultsTable