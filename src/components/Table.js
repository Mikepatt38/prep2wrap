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
      cells.push(
        <React.Fragment>
          <div key={value.username} className="table-row-cell">{value.firstName + ' ' + value.lastName}</div>
          <div key={value.availability} className="table-row-cell">{value.availability.toString()}</div>
          <div key={value.availability} className="table-row-cell">{value.availability.toString()}</div>  
          <div key={'CTA' + key} className="table-row-cell"><span>View Profile</span></div>       
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
    const { data } = this.props
    return (
      <div className="table">
        <div className="table-header table-header-users">
          {this.renderHeaders()}
        </div>
          {data !== null ? this.renderRows() : <p>Use the search to find users by name.</p>}
      </div>
    )
  }
}

export default Table