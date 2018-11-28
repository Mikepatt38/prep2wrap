import React, { Component } from 'react'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'
import Calendar from '../components/Calendar'
import { PageHeader } from '../components/PageHeader'
import CloseIcon from '../img/icon-close.svg'

const style = {
  marginBottom: '0px'
}


class Availability extends Component {
  state = {
    selectedDate: null,
    bookedDate: null,
    dateType: null
  }

  componentWillMount = () => {
    this.props.getAvailabilityDates(this.props.currentUser.id)
    console.log('Started listening')
  }

  componentWillUnmount = () => {
    this.props.stopListeningForDates(this.props.currentUser.id)
    console.log('Stopped listening')
  }
  
  onSelectedDate = (selectedDate) => {
    this.setState({
      selectedDate
    })
  }

  setSelectedDate = (selectedDate) => {
    this.setState({
      bookedDate: selectedDate
    },
    () => 
      this.props.setModal(true, "Set Availability Date", 
        <AvailabilityForm 
          currentUser={this.props.currentUser} 
          selectedDate={this.state.bookedDate}
          setAvailabilityDate={this.props.setAvailabilityDate} 
        />
    ))
  }

  render() {
    const { userDates } = this.props
    return (
      <div className="container containerMargin">
        <div className="card-title">
          <h3>Availability Calendar</h3>
          <p>A calendar view of your current availability. Click on the dates to change or update availability.</p>
        </div>
        <div className="card">
          <div className="card-item" style={style}>
            { this.state.selectedDate !== null 
              ? 
              <div className="calendar-alert">
                <div className="calendar-alert-text">
                  <h6>{this.state.selectedDate}</h6>
                  <p>This date is currently booked, to change it to open to receive job request, click the button below.</p>
                </div>
                <div className="calendar-alert-action">
                  <img onClick={() => this.setState({ selectedDate: null })} src={CloseIcon} alt="Close Icon" />
                </div>
              </div>
              :
              <p>Select a date to change the current availability.</p>
            }
          </div>
        </div>
        <Calendar 
          dates={userDates} 
          setSelectedDate={this.setSelectedDate} 
          onSelectedDate={this.onSelectedDate} 
        />
      </div>
    )
  }
}

export default Availability