import React from 'react'
import ReactDOM from 'react-dom'
import CloseIcon from '../../img/icon-close.svg'

function JobOveriewModal(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open">
          <div className="modal">
            <div className="modal-header">
              <h2>{props.job.jobName}</h2>
              <button className="button button-transparent" onClick={() => props.close()}><img src={CloseIcon} alt="Close Modal Icon" /></button>
            </div>
            <div className="modal-body">
              {
                props.job.jobStatus === 'Review' &&
                <div className="job-overview">
                  <p>{props.job.jobDescription}</p>
                  <br />
                  <div className="job-overview-section">
                    <label>Job Creator:</label>
                    <p><span>Michael Patterson</span></p>
                  </div>
                  <div className="job-overview-section">
                    <label>Job Location:</label>
                    <p><span>{props.job.jobLocation.value}</span></p>
                  </div>
                  <div className="job-overview-section">
                    <label>Position Offered:</label>
                    <p><span>{props.job.position}</span></p>
                  </div>
                  <div className="job-overview-section">
                    <label>Job Dates:</label>
                    <p>{props.job.jobDates.map( date => {
                      return <span>{date}</span>
                    })}</p>
                  </div>
                  <div className="job-overview-section">
                    <a className="button button-primary" href={`mailto:${props.job.jobContactEmail}`}>Contact Job Creator</a>
                  </div>
                </div>
              }

              {
                props.job.jobStatus === 'created' &&
                <div className="job-overview">
                  <p>{props.job.jobDesc}</p>
                  <br />
                  <div className="job-overview-section">
                    <label>Job Location:</label>
                    <p><span>{props.job.jobLocation.value}</span></p>
                  </div>
                  <div className="job-overview-section">
                    <label>Job Dates:</label>
                    <p>{props.job.jobDates.map( date => {
                      return <span>{date}</span>
                    })}</p>
                  </div>
                  <div className="job-overview-section">
                    <label>Crew Members Assigned with Status</label>
                    {props.job.usersAssigned.map( user => {
                      return <p>{user.position}: {user.name} <span className={`${user.status}`}>{user.status}</span></p>
                    })}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null

  )
}

export default JobOveriewModal