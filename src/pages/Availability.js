import React, { Component } from 'react'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar from '../components/Users/Calendar'
import CloseIcon from '../img/icon-close.svg'

const style = {
  marginBottom: '0px'
}


class Availability extends Component {
  state = {
    // selectedDate: null,
    bookedDate: null,
    dateType: null
  }

  componentDidMount = () => {
    this.props.getAvailabilityDates(this.props.currentUser)
  }

  onSelectedDate = (selectedDate) => {
    this.setState({
      selectedDate
    })
  }

  updateAvailability = (e) => {
    e.preventDefault()
    this.props.setModal(true, "Set Availability Date", 
      <AvailabilityForm 
        currentUser={this.props.currentUser} 
        selectedDate={moment()}
        setAvailabilityDate={this.props.setAvailabilityDate} 
        closeModal={this.props.closeModal}
      />   
    )
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
        <button className="button-primary" onClick={(e) => this.updateAvailability(e)}>Update Availability</button>
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

// {
//   this.state.selectedDate &&
//   <div className="card">
//     <div className="card-body">
//       <div className="calendar-alert">
//         <div className="calendar-alert-text">
//           <h6>{this.state.selectedDate}</h6>
//           <p>This date is currently booked, to change it to open to receive job request, click the button below.</p>
//           <p onClick={() => this.props.removeAvailabilityDate(this.props.currentUser.id.toString(), this.state.selectedDate)}>Remove date.</p>
//         </div>
//         <div className="calendar-alert-action">
//           <img onClick={() => this.setState({ selectedDate: null })} src={CloseIcon} alt="Close Icon" />
//         </div>
//       </div>
//     </div>
//   </div>
// }