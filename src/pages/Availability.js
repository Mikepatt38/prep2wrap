import React, { Component } from 'react'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar from '../components/Users/Calendar'
import { UserAvailabilityList } from '../components/Users/UserAvailabilityList'

class Availability extends Component {
  state = {
    loading: true
  }

  async componentDidMount(){
    const userAvailability = await this.props.getCurrentAvailability(this.props.currentUser.id)
    console.log(userAvailability)
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
          <div className="section-title">
            <h3>Calendar View:</h3>
          </div>
          {
            this.state.userAvailability && 
            <Calendar 
              dates={[]} 
              setSelectedDate={this.setSelectedDate} 
              // onSelectedDate={this.onSelectedDate} 
            />
          }
        </div>

        <div className="app-page-section">
          <div className="section-title">
            <h3>List View:</h3>
          </div>
          {
            // Need to check to make sure the availability array isn't empty
            this.state.userAvailability && 
            <UserAvailabilityList
              dates={[]}
              currentUser={currentUser}
            />
          }
        </div>
      </div>
    )
  }
}


export default Availability
