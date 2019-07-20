import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar from '../components/Users/Calendar'
import { UserAvailabilityTable } from '../components/Users/UserAvailabilityTable'
import Modal from '../components/General/Modal'

class Availability extends Component {
  state = {
    modalActive: false
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    return (
      <div className="app-page">
        <Modal
          active={this.state.modalActive}
          title="Set Availability Date"
          children={      
            <AvailabilityForm 
              currentUser={this.props.currentUser} 
              currentAvailability={this.props.currentUser.availability ? this.props.currentUser.availability : []}
              selectedDate={moment()}
              updateUserAvailability={this.props.updateUserAvailability} 
              close={this.toggleModal}
            /> 
          }
          close={this.toggleModal}
        />

        <div className="workspace">
          <div className="workspace-desktop">
            <div className="workspace-tab-list">
              <Link to="/" className="link">Dashboard</Link>
              <Link to="/jobs" className="link">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/availability" className="active">Availability</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
            <button className="button button-workspace" onClick={(e) => this.setState({modalActive: true})}>Update Availability</button>
          </div>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            <Calendar 
              currentUser={this.props.currentUser}
              dates={this.props.currentUser.availability} 
              setSelectedDate={this.setSelectedDate} 
              getCurrentAvailability={this.props.getCurrentAvailability}
            />
          </div>

          <div className="app-page-section">
            {
              <UserAvailabilityTable
                dates={this.props.currentUser.availability}
                currentUser={this.props.currentUser}
                getCurrentAvailability={this.props.getCurrentAvailability}
                removeAvailabilityDate={this.props.removeAvailabilityDate}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}


export default Availability
