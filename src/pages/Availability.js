import React, { Component } from 'react'
import moment from 'moment'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'


class Availability extends Component {
  state = {
    startDate: moment(),
    formattedDate: moment(),
    reason: '',
    dates: []
  }

  componentWillMount = () => {
    this.props.getAvailabilityDates(this.props.currentUser.id)
    console.log('Started listening')
  }

  componentWillUnmount = () => {
    this.props.stopListeningForDates(this.props.currentUser.id)
    console.log('Stopped listening')
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
      formattedDate: date.format('MM/DD/YYYY')
    })
  }
  
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { currentUser, setAvailabilityDate, getAvailabilityDates, userDates, stopListeningForDates } = this.props
    return (
      <div className="container">
        <h1 className="page-title">Your Availability</h1>
        <Card
          cardText="Select dates that you are unavailable or do not wish to receive jobs for."
          children={
            <AvailabilityForm 
              state={this.state}
              currentUser={currentUser} 
              setAvailabilityDate={setAvailabilityDate} 
              getAvailabilityDates={getAvailabilityDates} 
              userDates={userDates} 
              stopListeningForDates={stopListeningForDates} 
              handleChange={this.handleChange}
              onChange={this.onChange}
            />}
        />
      </div>
    )
  }
}

export default Availability