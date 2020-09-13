// External libs
import React, { Component, isValidElement } from 'react'
import { Button, Form, Input, Dropdown, Checkbox } from 'semantic-ui-react'
import axios from 'axios'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
// Own components...
import Loading from '../../Loading/Loading'

class CreatTour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //players: [{ full_name: 'Snorri', id: 4 }, { full_name: 'Árni', id: 7 }, { full_name: 'Regína', id: 9 }, { full_name: 'Haukur', id: 8 }],
      players: [],
      courses: [],
      selectedPlayers: [],
      selectedCourses: [],
      tourName: '',
      isLoading: false,
      numberOfRounds: 1,
      bestofRounds: 1,
      isRanking: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false })
    axios
      .get('/api/getallcourses')
      .then((res) => {
        this.setState({ courses: res.data })
        return axios.get('/users/getAllUsers')
      })
      .then((res2) => {
        // console.log(res2.data)
        this.setState({ players: res2.data })
        this.setState({ isLoading: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getIndexbyValue = (arr, val) => {
    const index = arr.findIndex((item) => item.name === val)
    return index
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    console.log('USER ID', this.props.userId)
    axios
      .post('/api/addtour', {
        players: this.state.selectedPlayers,
        courses: this.state.selectedCourses,
        tourName: this.state.tourName,
        rounds: this.state.numberOfRounds,
        bestofRounds: this.state.bestofRounds,
        userId: this.props.userId,
      })
      .then((response) => {
        this.setState({ loading: false })
        this.props.closeModal()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleCancel = () => {
    this.props.closeModal()
  }

  handleNameChange = (event) => {
    this.setState({ tourName: event.target.value })
  }

  handlePlayerChange = (event, value) => {
    this.setState({ selectedPlayers: value.value })
  }
  handleCourseChange = (event, value) => {
    this.setState({ selectedCourses: value.value })
  }

  handleNumberChange = (event, value) => {
    this.setState({ numberOfRounds: value.value })
  }

  handleIsRankingChange = (event, value) => {
    console.log(value.checked)
    this.setState({ isRanking: value.checked })
  }

  handleBestoffChange = (event, value) => {
    if (value.value > this.state.numberOfRounds) {
      this.setState({ bestofRounds: this.state.numberOfRounds })
    } else {
      this.setState({ bestofRounds: value.value })
    }
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
          <h1> Create new Tour </h1>
          <br />
          <Form>
            <Form.Group>
              <Form.Field
                required
                control={Input}
                label='Name'
                placeholder='Name'
                value={this.state.tourName}
                onChange={this.handleNameChange}
              />

              <Form.Field
                width='2'
                control={Input}
                min='1'
                max='20'
                value={this.state.numberOfRounds}
                type='Number'
                label='Rounds'
                placeholder='#'
                onChange={this.handleNumberChange}
              />

              <Form.Field
                width='2'
                control={Input}
                min='1'
                max={this.state.numberOfRounds}
                value={this.state.bestofRounds}
                type='Number'
                label='Best of Rounds'
                placeholder='#'
                onChange={this.handleBestoffChange}
              />
              <Form.Field
                width='2'
                control={Checkbox}
                checked={this.state.isRanking}
                label='Is ranking'
                onChange={this.handleIsRankingChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                width='6'
                control={Dropdown}
                fluid
                search
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
                selection
                multiple
                label='Courses'
                placeholder='Select courses'
                options={cselection}
                onChange={this.handleCourseChange}
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

export default CreatTour
