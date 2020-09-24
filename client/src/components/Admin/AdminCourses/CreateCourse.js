// External libs
import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import axios from 'axios'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
// Own components...
//import Loading from "../../Loading/Loading";
import CourseHoles from './CourseHoles'

class CreatCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isValid: false,
      location: '',
      courseName: '',
      tee: 'All',
      rowData: [],
    }
  }

  handleSubmit = () => {
    if (this.validateHoles()) {
      this.setState({ loading: true })
      axios
        .post('/api/addcourse', {
          courseName: this.state.courseName,
          tee: this.state.tee,
          country: this.state.location,
          holes: this.state.rowData,
        })
        .then((response) => {
          console.log(response.data)
          let course = {
            id: response.data,
            course_name: this.state.courseName,
            tee: this.state.tee,
            country: this.state.location,
          }
          this.props.addNewCourse(course)
          this.setState({ loading: false })
          this.props.closeModal()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  handleCancel = () => {
    this.props.closeModal()
  }

  handleNameChange = (event) => {
    this.setState({ courseName: event.target.value }, () => this.validateForm())
  }

  handleTeeChange = (event) => {
    this.setState({ tee: event.target.value }, () => this.validateForm())
  }

  handleCountryChange = (event) => {
    this.setState({ location: event.target.value }, () => this.validateForm())
  }

  handler = (holes) => {
    this.setState({ rowData: holes }, () => this.validateForm())
  }

  validateForm = () => {
    let courseName = this.state.courseName
    let tee = this.state.tee
    let location = this.state.location

    if (courseName && tee && Location && this.validateHoles()) {
      this.setState({ isValid: true })
    } else {
      this.setState({ isValid: false })
    }
  }

  validateHoles = () => {
    let isValid = true
    let pars = this.state.rowData[0]
    let handicaps = this.state.rowData[1]
    //console.log(pars)
    //console.log(handicaps)

    if (this.objectContains(pars, '') || this.objectContains(handicaps, '')) {
      isValid = false
    } else {
      console.log(this.sumObject(handicaps))
      if (this.sumObject(handicaps) === 171) {
        isValid = true
      } else {
        isValid = false
      }
    }

    return isValid
  }

  sumObject = (obj) => {
    return Object.keys(obj).reduce(
      (sum, key) => sum + parseFloat(parseInt(obj[key]) || 0),
      0
    )
  }

  objectContains = (myObj, value) => {
    let contains = false
    Object.keys(myObj).forEach((key) => {
      if (myObj[key] === value) {
        contains = true
      }
    })
    return contains
  }

  render() {
    //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
    return (
      <div>
        <h1> Add new Course </h1>
        <br />
        <Form>
          <Form.Group>
            <Form.Field
              required
              control={Input}
              label='Name'
              placeholder='Name'
              value={this.state.courseName}
              onChange={this.handleNameChange}
            />
            <Form.Field
              required
              control={Input}
              label='Tee'
              placeholder='Tee'
              value={this.state.tee}
              onChange={this.handleTeeChange}
            />
            <Form.Field
              required
              control={Input}
              label='Location'
              placeholder='Location'
              value={this.state.location}
              onChange={this.handleCountryChange}
            />
          </Form.Group>
        </Form>
        <br />
        <CourseHoles action={this.handler} />

        <Button
          primary
          onClick={this.handleSubmit}
          disabled={!this.state.isValid}
        >
          Submit
        </Button>
        <Button secondary onClick={this.handleCancel}>
          Cancel
        </Button>
      </div>
    )
  }
}

export default CreatCourse
