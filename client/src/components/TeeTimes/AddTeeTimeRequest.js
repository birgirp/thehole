// External libs
import React, { Component } from 'react'
import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react'

class AddTeeTimeRequest extends Component {
  constructor(props) {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd

    super(props)
    this.state = {
      errorText: '',
      play_date: today,
      course: '',
      courseKey: '',
      from: '15:00',
      to: '18:00',
      slots: 2,
      courseSelection: [
        { key: 'korpa18', text: 'Korpa 18h', value: 'Korpa 18h' },
        { key: 'grafarholt', text: 'Grafarholt', value: 'Grafarholt' },
        { key: 'korpa9', text: 'Korpa 9h', value: 'Korpa 9h' },
        { key: 'skaginn', text: 'Garðavöllur', value: 'Garðavöllur' },
      ],
    }
  }

  validateInput = () => {
    let { course, play_date, slots, from, to } = this.state
    let ok = false
    if (course && play_date && slots && from && to) {
      if (parseInt(to) <= parseInt(from)) {
        this.setState({ errorText: 'To should be larger than from!' })
      } else {
        this.setState({ errorText: '' })
        ok = true
      }
    } else {
      this.setState({ errorText: 'Missing data in the form!' })
    }

    return ok
  }

  handleSubmit = () => {
    if (this.validateInput()) {
      console.log('ok')
      let { courseKey, play_date, slots, from, to } = this.state

      let dags = play_date.replace(/-/g, '')
      let start = from.replace(/:/g, '')
      let stop = to.replace(/:/g, '')
      console.log(dags, stop)
      let userId = this.props.userId
      console.log(courseKey)

      axios
        .post('/api/addteetimerequest', {
          courseKey: courseKey,
          dags: dags,
          start: start,
          stop: stop,
          slots: slots,
          userId: userId,
        })
        .then((response) => {
          console.log(response.data)
          this.props.reloadRequests()
          this.props.closeModal()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  handleCancel = () => {
    this.props.cancel()
  }

  handleCourseChange = (e, data) => {
    let key = data.options.find(({ value }) => value === data.value)['key']
    console.log(key)
    this.setState({ course: data.value, courseKey: key })
  }

  handleDateChange = (event, { name, value }) => {
    this.setState({ play_date: value })
  }

  handleFromChange = (event, data) => {
    console.log(data)
    this.setState({ from: data.value })
  }

  handleToChange = (event, data) => {
    this.setState({ to: data.value })
  }

  handleSlotsChange = (event, data) => {
    this.setState({ slots: data.value })
  }

  render() {
    //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
    return (
      <div>
        <h1> Add new tee time monitoring request </h1>
        {this.state.errorText.length > 0 && (
          <h2 className='errorMessage'>{this.state.errorText}</h2>
        )}
        <br />
        <br />
        <Form>
          <Form.Group>
            <Form.Field
              width={4}
              required
              control={DateInput}
              iconPosition='left'
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
              control={TimeInput}
              closable
              iconPosition='left'
              label='From'
              placeholder='From'
              value={this.state.from}
              onChange={this.handleFromChange}
            />
            <Form.Field
              width={3}
              required
              closable
              control={TimeInput}
              iconPosition='left'
              label='To'
              placeholder='To'
              value={this.state.to}
              onChange={this.handleToChange}
            />
            <Form.Field
              name={'Slots'}
              width={3}
              required
              max='4'
              min='1'
              type='Number'
              control={Input}
              label='Slots'
              placeholder='Slots'
              value={this.state.slots}
              onChange={this.handleSlotsChange}
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
