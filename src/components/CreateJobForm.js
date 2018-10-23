import React, { Component } from 'react'
import FormTextInput from './FormTextInput'
import FormButton from './FormButton'

class CreateJobForm extends Component {
  state = {
    jobName: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form>
        <FormTextInput
          label="Job Name"
          name="jobName"
          type="text"
          value={this.state.jobName}
          onChange={this.handleChange}
        />
        <FormButton
          className="button-primary"
          buttonText="Create Job"
        />
      </form>
    )
  }
}

export default CreateJobForm