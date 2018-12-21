import React, { Component } from 'react'
import { AvailabilityForm } from '../components/AvailabilityForm'
import Calendar from '../components/Calendar'
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

  componentDidMount = () => {
    this.props.getAvailabilityDates(this.props.currentUser)
    console.log('Started listening')
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
          closeModal={this.props.closeModal}
        />
    ))
  }

  render() {
    const { userDates } = this.props
    return (
      <div className="container containerMargin">
        <div className="card">
          <div className="card-header">
            <h3>Availability Calendar</h3>
            <p>A calendar view of your current availability. Click on the dates to change or update availability.</p>
          </div>
          <div className="card-body">
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