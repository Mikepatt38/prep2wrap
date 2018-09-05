import React, { Component } from 'react'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'


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
    const { currentUser, setAvailabilityDate, setModal } = this.props
    return (
      <div className="container">
        <h1 className="page-title">My Availability 
        <button 
          className="button-primary button-inline" 
          onClick={() => setModal(true, "Set Availability Date", <AvailabilityForm currentUser={currentUser} setAvailabilityDate={setAvailabilityDate} />
        )}>Set Availability</button></h1>
        <Card
          cardTitle="Availability Calendar"
          cardText="Search through the calendar to view your current availability and blacked out dates."
        />
      </div>
    )
  }
}

export default Availability