import React, { Component } from 'react'

class UserFavoritesTable extends Component {
  state = {
    favorites: [],
    loading: true
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
    this.props.favorites.map( (value, key) => {

      cells.push(
        <React.Fragment key={key}>
          <div className="table-row-cell">{value.Name}</div>
          <div className="table-row-cell">
            <button className="button-primary">Contact</button>
            <button className="button-primary">Remove</button>
          </div>        
        </React.Fragment>
      )
      rows.push(
        <div className="table-row table-row--favorites" key={key}>
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
      </div>
    )
  }
}

export default UserFavoritesTable