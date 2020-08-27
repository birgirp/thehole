// External libs
import React, { Component } from 'react'
import { Table, Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios'

// Own components
import Loading from '../Loading/Loading'
import AddTeeTimeRequest from './AddTeeTimeRequest'

class TeeTimes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teetimes: [],
      loading: false,
      addingRequest: false,
    }
  }

  getAllRequests = () => {
    this.setState({ loading: true })
    axios
      .post('/api/fetchteetimes', { userId: 38 })
      .then((res) => {
        this.setState({ teetimes: res.data })
        this.setState({ loading: false })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getAllRequests()
  }

  handleAddRequest = () => {
    this.setState({ addingRequest: true })
  }

  close = () => {
    this.cancel()
  }

  addTeeTime = (request) => {
    let teetimes = this.state.teetimes
    teetimes.push(request)
    this.setState({ teetimes: teetimes })
  }

  cancel = () => {
    if (this.state.addingRequest) {
      console.log('closososo')
      this.setState({ addingRequest: false })
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else {
      let data = this.state.teetimes
      // let data = []
      return (
        <div>
          <h1>Monitoring tee times</h1>
          <br />
          <Button primary onClick={this.handleAddRequest}>
            Add new Request
          </Button>

          <br />
          <h3>My Requests</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Delete</Table.HeaderCell>
                <Table.HeaderCell>Course</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Slots</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((request) => {
                return (
                  <Table.Row key={request.id}>
                    <Table.Cell>
                      <Icon
                        name='delete'
                        link
                        onClick={() => this.deleteRequest(request.id)}
                      />
                    </Table.Cell>

                    <Table.Cell>{request.course}</Table.Cell>
                    <Table.Cell>
                      {request.play_date
                        .substring(0, 4)
                        .concat(
                          '-',
                          request.play_date.substring(4, 6),
                          '-',
                          request.play_date.substring(6)
                        )}
                    </Table.Cell>
                    <Table.Cell>{request.start_time}</Table.Cell>
                    <Table.Cell>{request.end_time}</Table.Cell>
                    <Table.Cell>{request.slots}</Table.Cell>
                    <Table.Cell>{request.status}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>

          <Modal
            id='addTeeTimeModal'
            open={this.state.addingRequest}
            onClose={this.close}
          >
            <Modal.Header>Add a new tee time request</Modal.Header>
            <Modal.Content>
              {
                <AddTeeTimeRequest
                  closeModal={this.close}
                  addNewTeeTime={this.addNewTeeTime}
                  reloadRequests={this.getAllRequests}
                  cancel={this.cancel}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
export default TeeTimes
