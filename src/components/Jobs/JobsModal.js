import React from 'react'
import ReactDOM from 'react-dom'
import SKillsIcon from '../../img/icon-skills.svg'
import LocationIcon from '../../img/icon-location.svg'
import PositionsIcon from '../../img/icon-positions.svg'
import CalendarIcon from '../../img/icon-calendarr.svg'
import MailIcon from '../../img/icon-mail.svg'
import CloseIcon from '../../img/icon-close.svg'

function JobOveriewModal(props){
  return (
    props.active ?
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modalBg modal-open modal-user">
          <div className="modal">
            <div className="modal-header">
              <h2>{props.job.jobName}</h2>
              <div className="modal-close">
                <div className="close" onClick={() => props.close()}><img src={CloseIcon} alt="Close Icon" /></div>
              </div>
            </div>
            <div className="modal-body">
              <React.Fragment>
                { (props.job.jobStatus === 'Review' || props.job.jobStatus === 'Active') &&
                <div className="modal-section">
                  <div className="modal-cell-lg">
                    <p>{props.job.jobDescription}</p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={SKillsIcon} alt="Job Creator Icon" /> Job Creator:</label>
                    <p><span>{props.job.jobCreator}</span></p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={LocationIcon} alt="Job Location Icon" /> Job Location:</label>
                    <p><span>{props.job.jobLocation.value}</span></p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={PositionsIcon} alt="User Positions Icon" /> Position Offered:</label>
                    <p><span>{props.job.position}</span></p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={CalendarIcon} alt="User Dates Icon" /> Job Dates:</label>
                    <p>{props.job.jobDates.map( (date, key) => {
                      return <span key={key}>{date}</span>
                    })}</p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={MailIcon} alt="User Contact Icon" /> Contact Job Creator:</label>
                    <a className="link" href={`mailto:${props.job.jobContactEmail}`}>Contact Job Creator</a>
                  </div>
                </div> }
              </React.Fragment>
              <React.Fragment>
                { props.job.jobStatus === 'created' &&
                <div className="modal-section">
                  <div className="modal-cell-lg">
                    <p>{props.job.jobDesc}</p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={LocationIcon} alt="Job Location Icon" /> Job Location:</label>
                    <p><span>{props.job.jobLocation.value}</span></p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={CalendarIcon} alt="User Dates Icon" /> Job Dates:</label>
                    <p>{props.job.jobDates.map( (date, key) => {
                      return <span key={key}>{date}</span>
                    })}</p>
                  </div>
                  <div className="modal-cell-lg">
                    <label><img src={PositionsIcon} alt="Job Positions Icon" /> Users Assigned With Position and Invitation Status:</label>
                      {props.job.usersAssigned.map( (user, key) => {
                        return <p key={key}><span className={user.status === 'Review' ? 'user-pill review' : 'user-pill accepted'}>{user.name} invited as a {user.position} is {user.status === 'Review' ? 'Reviewing' : 'Accepted'}</span></p>
                      })}
                  </div>
                </div> }
              </React.Fragment>
            </div>
          </div>
        </div>
      </React.Fragment>, document.body
    ) : null

  )
}

export default JobOveriewModal