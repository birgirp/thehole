import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      isLoading: false,
      isAddingTour: false,
      playerId: this.props.userId,
    }
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    let id = this.props.userId

    axios
      .post('/api/getplayertours', { playerId: id })
      .then((res) => {
        this.setState({ tours: res.data })
        this.setState({ isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const data = this.state.tours

    if (this.state.isLoading) {
      return <Loading />
    } else if (data) {
      return (
        <div>
          <Link
            to={{
              pathname: '/home/mytours',
              state: { userId: this.props.userId },
            }}
          >
            <Button>Manage my Tours</Button>
          </Link>
          <h1>My Tours</h1>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='3'>Tour Name</Table.HeaderCell>
                <Table.HeaderCell width='2'>Year</Table.HeaderCell>
                <Table.HeaderCell width='2'>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((tour) => {
                return (
                  <Table.Row key={tour.id}>
                    <Table.Cell>
                      <Link to={`/tour/${tour.id}`}>{tour.tour_name}</Link>
                    </Table.Cell>
                    <Table.Cell>{tour.year}</Table.Cell>
                    <Table.Cell>{tour.full_name}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Player has no tours</h1>
        </div>
      )
    }
  }
}

export default Home
