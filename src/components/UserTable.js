import React from 'react'

const TableRow = ({ name, skills, location  }) => {
  return (
    <div className="table-row">
      <div className="table-row-content col-4">
        <div className="table-row-content-item">
          <p>{name}</p>
        </div>
        <div className="table-row-content-item">
          <p>{location}</p>
        </div>
        <div className="table-row-content-item">
          <p>{skills}</p>
        </div>
        <div className="table-row-content-item">
          <button className="btn-learnmore">Learn More</button>
        </div>
      </div>
    </div>
  )
}

export const UserTable = ({ users }) => {
  return (
    <React.Fragment>
      <h4 className="table-title">User Search Results</h4>
      <div className="table">
        <div className="table-headers">
          <div className="table-header">
            <h4>Name</h4>
          </div>
          <div className="table-header">
            <h4>Location</h4>
          </div>
          <div className="table-header">
            <h4>Skills</h4>
          </div>
          <div className="table-header">
            <h4>More</h4>
          </div>
        </div>
        { users && users.map((user) => {
          return (
            <TableRow 
              name={user.firstName + ' ' + user.lastName}
              location={user.location}
              skills={user.skills}
            />
          )
        })}
        { users.length === 0 && <p>Enter a first or last name to return users.</p> }
      </div>
    </React.Fragment>
  )
}
