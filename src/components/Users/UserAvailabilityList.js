import React, { Component } from 'react'

export class UserAvailabilityList extends Component {
  render() {
    return (
      <div className="availability-list">
        <h3>Current Dates</h3>
        {
          this.props.dates &&
          this.props.dates.map( date => {
            return <p>{date.dateType}: {date.dateTitle}</p>
          })
        }
      </div>
    )
  }
}