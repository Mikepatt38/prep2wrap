import React, { Component } from 'react'
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
              currentAvailability={this.props.currentUser.availability}
              selectedDate={moment()}
              updateUserAvailability={this.props.updateUserAvailability} 
            /> 
          }
          close={this.toggleModal}
        />

        <div className="app-page-header">
          <h1>Availability</h1>
          <button className="button-primary button-header" onClick={(e) => this.setState({modalActive: true})}>Update Availability</button>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            <p>A calendar view of your booked/ personal days that you are unavailable for further hire.</p>
            {
              <Calendar 
                currentUser={this.props.currentUser}
                dates={this.props.currentUser.availability} 
                setSelectedDate={this.setSelectedDate} 
                getCurrentAvailability={this.props.getCurrentAvailability}
              />
            }
          </div>

          <div className="app-page-section">
            <p>A list view of your booked/ personal days that you are unavailable for further hire.</p>
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
