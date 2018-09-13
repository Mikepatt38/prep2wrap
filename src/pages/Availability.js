import React, { Component } from 'react'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'
import Calendar from '../components/Calendar'
import { PageHeader } from '../components/PageHeader'


class Availability extends Component {

  componentWillMount = () => {
    this.props.getAvailabilityDates(this.props.currentUser.id)
    console.log('Started listening')
  }

  componentWillUnmount = () => {
    this.props.stopListeningForDates(this.props.currentUser.id)
    console.log('Stopped listening')
  }

  render() {
    const { currentUser, setAvailabilityDate, setModal, userDates } = this.props
    return (
      <React.Fragment>
        <PageHeader pageTitle="User Availability" />
        <div className="container">
          <h2 className="component-title">Availability Calendar</h2>
          <p className="component-text">A calendar view of your current availability with dates that are booked or marked unavailable.</p>
          <Calendar dates={userDates} />
        </div>
      </React.Fragment>
    )
  }
}

export default Availability

// <button 
// className="button-primary button-inline" 
// onClick={() => 
//   setModal(true, "Set Availability Date", <AvailabilityForm currentUser={currentUser} setAvailabilityDate={setAvailabilityDate} />
// )}>Set Availability</button>