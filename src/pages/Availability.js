import React, { Component } from 'react'
import { Card } from '../components/Card'
import { AvailabilityForm } from '../components/Availability'


class Availability extends Component {

  render() {
    const { currentUser, setAvailabilityDate } = this.props
    return (
      <div className="container">
        <h1 className="page-title">Your Availability</h1>
        <Card
          cardText="Select dates that you are unavailable or do not wish to receive jobs for."
          children={<AvailabilityForm currentUser={currentUser} setAvailabilityDate={setAvailabilityDate} />}
        />
      </div>
    )
  }
}

export default Availability