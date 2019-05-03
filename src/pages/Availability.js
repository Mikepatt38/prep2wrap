import React, { Component } from 'react'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar from '../components/Users/Calendar'
import { UserAvailabilityTable } from '../components/Users/UserAvailabilityTable'

class Availability extends Component {
  state = {
    loading: true
  }

  async componentDidMount(){
    const userAvailability = await this.props.getCurrentAvailability(this.props.currentUser.id)
    this.setState({
      loading: false,
      userAvailability: userAvailability
    })
  }

  updateAvailability = (e) => {
    e.preventDefault()
    this.props.setModal(true, "Set Availability Date", 
      <AvailabilityForm 
        currentUser={this.props.currentUser} 
        currentAvailability={this.state.userAvailability}
        selectedDate={moment()}
        updateUserAvailability={this.props.updateUserAvailability} 
        closeModal={this.props.closeModal}
      />   
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="app-page">
        <div className="app-page-title">
          <h1>User Availability</h1>
          <button className="button-primary" onClick={(e) => this.updateAvailability(e)}>Update Availability</button>
        </div>
        <div className="app-page-section">
          {
            this.state.userAvailability && 
            <Calendar 
              currentUser={currentUser}
              dates={this.state.userAvailability} 
              setSelectedDate={this.setSelectedDate} 
            />
          }
        </div>

        <div className="app-page-section">
          <div className="section-title">
            <p>Availability list view:</p>
          </div>
          {
            // Need to check to make sure the availability array isn't empty
            this.state.userAvailability && 
            <UserAvailabilityTable
              dates={this.state.userAvailability}
              currentUser={currentUser}
              removeAvailabilityDate={this.props.removeAvailabilityDate}
            />
          }
        </div>
      </div>
    )
  }
}


export default Availability
