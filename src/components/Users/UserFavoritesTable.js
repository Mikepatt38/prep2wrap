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
          <div className="table-row-cell">{value.name}</div>
          <div className="table-row-cell">
            <button className="button-table button-table-primary">Contact</button>
          </div>        
          <div className="table-row-cell">
            <button className="button-table button-table-danger" onClick={() => this.props.removeUserFromUserFavorites(this.props.currentUser.id, value)}>Remove</button>
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

  renderEmptyTable() {
    return (
      <React.Fragment>
        <p>You currently don't have any favorites.</p>
        <p>Search for users to add them to your favorites so you can hire, find and connect with them easier.</p>
      </React.Fragment>
    )
  }

  render() {
    if(!this.props.favorites) return this.renderEmptyTable()
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