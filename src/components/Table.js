import React, { Component } from 'react'

class Table extends Component {

  renderHeaders() {
    return (
      this.props.headers.map( (header) => {
        return <div className="table-header-col">{header}</div>
      })
    )
  }

  renderRows(){
    let rows = []
    let cells = []

    this.props.data.map( (data, key) => {
      this.props.headers.map( (header) => {
        console.log(this.props.data)
        cells.push(
          <div className="table-row-cell">{data[`${header}`]}</div>
        )
      })
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
    console.log(this.props.data)
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