import React, { Component } from 'react'

class Table extends Component {

  renderHeaders() {
    return (
      this.props.headers.map( (header) => {
        return <div className="table-header-col" key={header}>{header}</div>
      })
    )
  }

  renderRows(){
    let rows = []
    let cells = []
    this.props.value.map( (value, key) => {
      const locations = this.props.value[key].location.map ( (value) => {
        return value.label
      })
      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>
          <div className="table-row-cell">{locations.map( (location) => {return location})}</div>
          <div className="table-row-cell">{value.availability.toString()}</div>  
          <div className="table-row-cell"><span>View Profile</span></div>       
        </React.Fragment>
      )
      rows.push(
        <div className="table-row table-row--users" key={key}>
          {cells}
        </div>
      )
      cells = []
    })
    return <div className="table-body">{rows}</div>
  }

  render() {
    // console.log(this.props.value[0].location)
    return (
      <div className="table">
        <div className="table-header table-header-users">
          {this.renderHeaders()}
        </div>
          {this.renderRows()}
      </div>
    )
  }
}

export default Table