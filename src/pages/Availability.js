import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar, { CalendarKey } from '../components/Users/Calendar'
import { UserAvailabilityTable } from '../components/Users/UserAvailabilityTable'
import Modal from '../components/General/Modal'

class Availability extends Component {
  state = {
    modalActive: false,
    activeMonth: this.getCurrentMonth()
  }

  getCurrentMonth(){
    const date = new Date
    return date.getMonth()
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  toggleActiveMonth = (month) => {
    this.setState({
      activeMonth: month
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
              addMultipleDatesToAvailability={this.props.addMultipleDatesToAvailability}
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
              <Link to="/availability" className="active">Availability</Link>
              <Link to="/jobs" className="link">Jobs</Link>
              <Link to="/crew" className="link">Crew</Link>
              <Link to="/account-settings" className="link">Settings</Link>
            </div>
            <button className="button button-workspace" onClick={() => this.setState({modalActive: true})}>Add Unavailable Days</button>
          </div>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            <div className="mobile-only">
              <button className="button button-primary" onClick={() => this.setState({modalActive: true})}>Add Unavailable Days</button>
            </div>
            <Calendar 
              currentUser={this.props.currentUser}
              dates={this.props.currentUser.availability} 
              setSelectedDate={this.setSelectedDate} 
              getCurrentAvailability={this.props.getCurrentAvailability}
              activeMonth={this.state.activeMonth}
              toggleActiveMonth={this.toggleActiveMonth}
            />
            <CalendarKey />
          </div>

          <div className="app-page-section">
            {
              <UserAvailabilityTable
                dates={this.props.currentUser.availability}
                currentUser={this.props.currentUser}
                getCurrentAvailability={this.props.getCurrentAvailability}
                removeAvailabilityDate={this.props.removeAvailabilityDate}
                activeMonth={this.state.activeMonth}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}


export default Availability
