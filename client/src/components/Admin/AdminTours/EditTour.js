import React, { Component } from 'react'
import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import Loading from '../../Loading/Loading'

class EditTour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      status: '',
      rounds: 0,
      players: [],
      courses: [],
      selectedPlayers: [],
      selectedCourses: [],
      initialPlayers: [],
      initialCourses: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    let t = this.props.editingTour
    this.setState({
      id: t.id,
      name: t.name,
      status: t.status,
      rounds: parseInt(t.rounds),
      isLoading: true,
    })

    axios
      .get('/api/getallcourses')
      .then((res) => {
        this.setState({ courses: res.data })
        return axios.get('/users/getAllUsers')
      })
      .then((res2) => {
        this.setState({ players: res2.data })
        return axios.post('/api/gettourplayers', { tourId: t.id })
      })
      .then((res3) => {
        let selectedPlayers = []
        res3.data.forEach((element) => {
          selectedPlayers.push(element.player_id)
        })
        this.setState({ initialPlayers: selectedPlayers })
        this.setState({ selectedPlayers: selectedPlayers })
        return axios.post('/api/gettourcourses', { tourId: t.id })
      })
      .then((res4) => {
        let selectedCourses = []
        res4.data.forEach((element) => {
          selectedCourses.push(element.course_id)
        })
        this.setState({ initialCourses: selectedCourses })
        this.setState({ selectedCourses: selectedCourses })
        this.setState({ isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  handleSubmit = async () => {
    try {
      let initial = this.props.editingTour
      if (
        initial.name !== this.state.name ||
        initial.status !== this.state.status ||
        parseInt(initial.rounds) !== parseInt(this.state.rounds)
      ) {
        console.log('i need to update tour name or status or rounds')
        this.setState({ loading: true })

        let response = await axios.post('/api/updatetour', {
          tourId: this.state.id,
          tourStatus: this.state.status,
          tourName: this.state.name,
          rounds: this.state.rounds,
        })

        this.setState({ loading: false })
        this.props.closeModal()
      }
      if (
        JSON.stringify(this.state.initialCourses.sort()) !==
        JSON.stringify(this.state.selectedCourses.sort())
      ) {
        console.log('i need to update courses')
      }
      if (
        JSON.stringify(this.state.initialPlayers.sort()) !==
        JSON.stringify(this.state.selectedPlayers.sort())
      ) {
        console.log('i need to updated players')
      }
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error)
    }
  }

  handleCancel = () => {
    this.props.closeModal()
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  handleStatusChange = (event, value) => {
    this.setState({ status: value.value })
  }

  handlePlayerChange = (event, value) => {
    this.setState({ selectedPlayers: value.value })
  }
  handleCourseChange = (event, value) => {
    this.setState({ selectedCourses: value.value })
  }

  handleNumberChange = (event, value) => {
    this.setState({ rounds: value.value })
  }

  render() {
    const players = this.state.players
    const courses = this.state.courses

    let pselection = players.map((val, index, arr) => {
      return { key: val.id, text: val.full_name, value: val.id }
    })
    let cselection = courses.map((val, index, arr) => {
      return {
        key: val.id,
        text: val.course_name + '-' + val.tee,
        value: val.id,
      }
    })

    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <div>
          <h1> Edit Tour </h1>
          <br />
          <Form>
            <Form.Group>
              <Form.Field
                control={Input}
                label='Name'
                placeholder='Name'
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <Form.Field
                control={Dropdown}
                label='Status'
                placeholder='Status'
                options={[
                  { key: 1, text: 'Open', value: 'Open' },
                  { key: 2, text: 'Closed', value: 'Closed' },
                ]}
                value={this.state.status}
                onChange={this.handleStatusChange}
              />
              <Form.Field
                width='6'
                control={Dropdown}
                fluid
                search
                value={this.state.selectedPlayers}
                selection
                multiple
                label='Players'
                placeholder='Select players'
                options={pselection}
                onChange={this.handlePlayerChange}
              />
              <Form.Field
                width='6'
                control={Dropdown}
                fluid
                search
                value={this.state.selectedCourses}
                selection
                multiple
                label='Courses'
                placeholder='Select courses'
                options={cselection}
                onChange={this.handleCourseChange}
              />
              <Form.Field
                width='2'
                control={Input}
                min='1'
                max='20'
                value={this.state.rounds}
                type='Number'
                label='Rounds'
                placeholder='#'
                options={cselection}
                onChange={this.handleNumberChange}
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
}

export default EditTour
