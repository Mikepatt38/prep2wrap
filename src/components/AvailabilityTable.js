import React from 'react'

const TableRow = ({ date, dateType, reason }) => {
  return (
    <div className="table-row">
      <div className="table-row-content">
        <div className="table-row-content-item">
          <div className="date-item-text">
            <p className="date">{date}</p>
            <p className="date-type">{dateType}</p>
          </div>
        </div>
        <div className="table-row-content-item">
          <p>{reason}</p>
        </div>
        <div className="table-row-content-item">
          <button className="btn-table">Delete</button>
        </div>
      </div>
    </div>
  )
}

export const AvailabilityTable = ({ userDates }) => {
  return (
    <React.Fragment>
      <h4 className="table-title">Current Dates</h4>
      <div className="table">
        { userDates && userDates.map((date, key) => {
          return (
            <TableRow 
              key={key}
              date={date.date}
              dateType="This date is blacked out."
              reason={date.reason}
            />
          )
        })}
        { userDates.length === 0 && <p>There are no current booked or blacked out dates to show.</p> }
      </div>
    </React.Fragment>
  )
}
