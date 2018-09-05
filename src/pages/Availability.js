import React, { Component } from 'react'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'
import Calendar from '../components/Calendar'


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
          onClick={() => 
            setModal(true, "Set Availability Date", <AvailabilityForm currentUser={currentUser} setAvailabilityDate={setAvailabilityDate} />
        )}>Set Availability</button></h1>
        <Calendar />
      </div>
    )
  }
}

export default Availability