// External libs
import React, { Component } from 'react'
import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { DateInput } from 'semantic-ui-calendar-react'

class AddTeeTimeRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      play_date: '',
      course: '',
      from: '',
      to: '',
      slots: 2,
      courseSelection: [
        { key: 'korpa18', text: 'Korpa 18h', value: 'Korpa 18h' },
        { key: 'grafarholt', text: 'Grafarholt', value: 'Grafarholt' },
        { key: 'korpa9', text: 'Korpa 9h', value: 'Korpa 9h' },
        { key: 'skaginn', text: 'Garðavöllur', value: 'Garðavöllur' },
      ],
    }
  }

  handleSubmit = () => {}

  handleCancel = () => {
    this.props.cancel()
  }

  handleCourseChange = (event) => {
    this.setState({ course: event.target.value })
  }

  handleDateChange = (event, { name, value }) => {
    this.setState({ play_date: value })
  }

  handleFromChange = (event) => {
    this.setState({ from: event.target.value })
  }

  handleToChange = (event) => {
    this.setState({ to: event.target.value })
  }

  handleSlotsChange = (event) => {
    this.setState({ slots: event.target.value })
  }

  render() {
    //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
    return (
      <div>
        <h1> Add new tee time monitoring request </h1>
        <br />
        <Form>
          <Form.Group>
            <Form.Field
              width={4}
              required
              control={DateInput}
              label='Date'
              placeholder='Date'
              value={this.state.play_date}
              onChange={this.handleDateChange}
            />
            <Form.Select
              required
              width={4}
              label='Course'
              placeholder='Course'
              options={this.state.courseSelection}
              value={this.state.course}
              onChange={this.handleCourseChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              width={3}
              required
              control={Input}
              label='From'
              placeholder='From'
              value={this.state.from}
              onChange={this.handleFromChange}
            />
            <Form.Field
              width={3}
              required
              control={Input}
              label='To'
              placeholder='To'
              value={this.state.to}
              onChange={this.handleToChange}
            />
          </Form.Group>
        </Form>
        <br />

        <Button primary onClick={this.handleSubmit}>
          Submit
        </Button>
        <Button secondary onClick={this.handleCancel}>
          Cancel
        </Button>
      </div>
    )
  }
}

export default AddTeeTimeRequest
