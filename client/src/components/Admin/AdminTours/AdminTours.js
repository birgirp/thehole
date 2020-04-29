import React, { Component } from 'react'
import { Button, Modal, Table, Icon } from 'semantic-ui-react'
import axios from 'axios'

// Own components
import Loading from '../../Loading/Loading'
import CreateTour from './CreateTour'
import EditTour from './EditTour'
import TourTeams from './TourTeams'

class AdminTours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      isCreatingTour: false,
      isEditingTour: false,
      isEditTourTeams: false,
      isLoading: false,

      editingTour: { id: '', name: '', status: '', rounds: '', teams: '' }
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    axios
      .get('/api/getalltours')
      .then(res => {
        if (res.lenght === 0) {
          console.log('No tours found')
        } else {
          console.log(res.data)
          this.setState({ tours: res.data, isLoading: false })
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  closeCreateModal = () => {
    this.setState({ isCreatingTour: false })
  }
  closeEditModal = () => {
    this.setState({ isEditingTour: false })
  }
  closeEditTourTeams = () => {
    this.setState({ isEditTourTeams: false })
  }

  handleAddTour = e => {
    this.setState({ isCreatingTour: true })
  }

  handleEditTour = (id, name, status, rounds) => {
    this.setState({ isEditingTour: true })
    let editingTour = this.state.editingTour
    editingTour.id = id
    editingTour.name = name
    editingTour.status = status
    editingTour.rounds = rounds

    this.setState({ editingTour: editingTour })
  }

  handleEditTourTeams = (id, name, status, rounds, teams) => {
    this.setState({ isEditTourTeams: true })
    let editingTour = this.state.editingTour
    editingTour.id = id
    editingTour.name = name
    editingTour.status = status
    editingTour.rounds = rounds
    editingTour.teams = teams

    this.setState({ editingTour: editingTour })
  }

  setHasTeams = () => {
    let editingTour = this.state.editingTour
    let tour_id = editingTour.id
    let tours = this.state.tours
    let index = tours.findIndex(obj => parseInt(obj.id) === tour_id)
    tours[index].teams = 2
    this.setState({ tours: tours })
  }

  render() {
    if (!this.state.tours) {
      return (
        <div>
          <span>No tours registered</span>
          <br />
          <br />
          <Button primary onClick={this.handleAddTour}>
            Add new Tour
          </Button>

          <Modal
            size='fullscreen'
            open={this.state.isCreatingTour}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new Tour</Modal.Header>
            <Modal.Content>
              {<CreateTour closeModal={this.closeCreateModal} />}
            </Modal.Content>
          </Modal>
        </div>
      )
    }

    const data = this.state.tours
    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <div>
          <h1>Admin Tours</h1>
          <Button primary onClick={this.handleAddTour}>
            Add new Tour
          </Button>
          <br />
          <br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                <Table.HeaderCell width='1'>Teams</Table.HeaderCell>
                <Table.HeaderCell width='3'>Tour Name</Table.HeaderCell>
                <Table.HeaderCell width='2'>Status</Table.HeaderCell>
                <Table.HeaderCell width='2'>Rounds</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(tour => {
                return (
                  <Table.Row key={tour.id}>
                    <Table.Cell>
                      <Icon
                        name='edit'
                        link
                        onClick={() =>
                          this.handleEditTour(
                            tour.id,
                            tour.tour_name,
                            tour.tour_status,
                            tour.rounds
                          )
                        }
                      ></Icon>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name='balance scale'
                        link
                        onClick={() =>
                          this.handleEditTourTeams(
                            tour.id,
                            tour.tour_name,
                            tour.tour_status,
                            tour.rounds,
                            tour.teams
                          )
                        }
                      ></Icon>
                    </Table.Cell>
                    <Table.Cell>{tour.tour_name}</Table.Cell>
                    <Table.Cell>{tour.tour_status}</Table.Cell>
                    <Table.Cell>{tour.rounds}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>

          <Modal
            size='fullscreen'
            open={this.state.isCreatingTour}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new Tour</Modal.Header>
            <Modal.Content scrolling={true}>
              {<CreateTour closeModal={this.closeCreateModal} />}
            </Modal.Content>
          </Modal>

          <Modal
            size='fullscreen'
            open={this.state.isEditingTour}
            onClose={this.closeEditModal}
          >
            <Modal.Header>
              Edit Tour: {this.state.editingTour.name}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <EditTour
                  closeModal={this.closeEditModal}
                  editingTour={this.state.editingTour}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            size='fullscreen'
            open={this.state.isEditTourTeams}
            onClose={this.closeEditTourTeams}
          >
            <Modal.Header>
              Tour Teams: {this.state.editingTour.name}{' '}
            </Modal.Header>
            <Modal.Content scrolling={true}>
              {
                <TourTeams
                  closeModal={this.closeEditTourTeams}
                  setHasTeams={this.setHasTeams}
                  editingTour={this.state.editingTour}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

export default AdminTours
