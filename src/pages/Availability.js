import React, { Component } from 'react'
import moment from 'moment'
import { AvailabilityForm } from '../components/Users/AvailabilityForm'
import Calendar from '../components/Users/Calendar'
import { UserAvailabilityTable } from '../components/Users/UserAvailabilityTable'
import Modal from '../components/General/Modal'

class Availability extends Component {
  state = {
    loading: true,
    modalActive: false
  }

  async componentDidMount(){
    const userAvailability = await this.props.getCurrentAvailability(this.props.currentUser.id)
    this.setState({
      loading: false,
      userAvailability: userAvailability
    })
  }

  toggleModal = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="app-page">
        <Modal
          active={this.state.modalActive}
          title="Set Availability Date"
          children={      
            <AvailabilityForm 
              currentUser={this.props.currentUser} 
              currentAvailability={this.state.userAvailability}
              selectedDate={moment()}
              updateUserAvailability={this.props.updateUserAvailability} 
              close={this.toggleModal}
            /> 
          }
        />

        <div className="app-page-header">
          <h1>Availability</h1>
          <button className="button-primary button-header" onClick={(e) => this.setState({modalActive: true})}>Update Availability</button>
        </div>

        <div className="app-page-body">
          <div className="app-page-section">
            <p>A calendar view of your booked/ personal days that you are unavailable for further hire.</p>
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
            <p>A list view of your booked/ personal days that you are unavailable for further hire.</p>
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
      </div>
    )
  }
}


export default Availability
