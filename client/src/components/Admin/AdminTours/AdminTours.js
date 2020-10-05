import React, { Component } from 'react'
import { Button, Modal, Table, Icon } from 'semantic-ui-react'
import axios from 'axios'

// Own components
import Loading from '../../Loading/Loading'
import CreateTour from './CreateTour'
import EditTour from './EditTour'
import TourTeams from './TourTeams'
import CreateCourse from '../AdminCourses/CreateCourse'

class AdminTours extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
      addingcourse: false,
      isCreatingTour: false,
      isEditingTour: false,
      isEditTourTeams: false,
      isLoading: false,
      userId: 34,
      editingTour: {
        id: '',
        name: '',
        status: '',
        rounds: '',
        teams: '',
        isRanking: '',
        bestof: '',
      },
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    let userId = null
    if (this.props.location.state) {
      userId = this.props.location.state.userId
      this.setState({ userId: userId })
    } else {
      userId = this.state.userId
    }

    this.fetchData(userId)
  }

  fetchData = (userId) => {
    axios
      .post('/api/getalltours', { userId: userId })
      .then((res) => {
        if (res.lenght === 0) {
          console.log('No tours found')
        } else {
          this.setState({ tours: res.data, isLoading: false })
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  closeCreateCourseModal = () => {
    this.setState({ addingcourse: false })
  }

  closeCreateModal = () => {
    this.setState({ isCreatingTour: false, isLoading: true }, () =>
      this.fetchData(this.state.userId)
    )
  }
  cancelCreateModal = () => {
    this.setState({ isCreatingTour: false })
  }

  closeEditModal = () => {
    this.setState({ isEditingTour: false, isLoading: true }, () =>
      this.fetchData(this.state.userId)
    )
  }

  cancelEditModal = () => {
    this.setState({ isEditingTour: false })
  }

  closeEditTourTeams = () => {
    this.setState({ isEditTourTeams: false })
  }

  handleAddTour = (e) => {
    this.setState({ isCreatingTour: true })
  }

  handleAddCourse = (e) => {
    this.setState({ addingcourse: true })
  }

  handleEditTour = (id, name, status, rounds, bestof, isRanking) => {
    this.setState({ isEditingTour: true })
    let editingTour = this.state.editingTour
    editingTour.id = id
    editingTour.name = name
    editingTour.status = status
    editingTour.rounds = rounds
    editingTour.bestof = bestof
    editingTour.isRanking = isRanking

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
    let index = tours.findIndex((obj) => parseInt(obj.id) === tour_id)
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
          <Button primary onClick={this.handleAddCourse}>
            Add new Course
          </Button>
          <Modal
            size='fullscreen'
            open={this.state.isCreatingTour}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new Tour</Modal.Header>
            <Modal.Content>
              {
                <CreateTour
                  closeModal={this.closeCreateModal}
                  cancelModal={this.cancelCreateModal}
                  userId={this.state.userId}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            size='fullscreen'
            open={this.state.addingcourse}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content scrolling>
              {
                <CreateCourse
                  closeModal={this.closeCreateCourseModal}
                  // addNewCourse={this.addNewCourse}
                />
              }
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

          <Button primary onClick={this.handleAddCourse}>
            Add new Course
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
                <Table.HeaderCell width='2'>Best of #</Table.HeaderCell>
                <Table.HeaderCell width='2'>Ranking</Table.HeaderCell>
                <Table.HeaderCell width='2'>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((tour) => {
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
                            tour.rounds,
                            tour.bestof,
                            tour.is_ranking
                          )
                        }
                      />
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
                      />
                    </Table.Cell>
                    <Table.Cell>{tour.tour_name}</Table.Cell>
                    <Table.Cell>{tour.tour_status}</Table.Cell>
                    <Table.Cell>{tour.rounds}</Table.Cell>
                    <Table.Cell>{tour.bestof}</Table.Cell>
                    <Table.Cell>{tour.is_ranking.toString()}</Table.Cell>
                    <Table.Cell>{tour.full_name}</Table.Cell>
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
            <Modal.Content scrolling={true} height='100vh'>
              {
                <CreateTour
                  closeModal={this.closeCreateModal}
                  cancelModal={this.cancelCreateModal}
                  userId={this.state.userId}
                />
              }
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
                  cancelModal={this.cancelEditModal}
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

          <Modal
            size='fullscreen'
            open={this.state.addingcourse}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content scrolling>
              {
                <CreateCourse
                  closeModal={this.closeCreateCourseModal}
                  // addNewCourse={this.addNewCourse}
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
