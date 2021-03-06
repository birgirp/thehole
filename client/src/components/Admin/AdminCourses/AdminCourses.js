// External libs
import React, { Component } from 'react'
import { Table, Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios'

// Own components
import Loading from '../../Loading/Loading'
import EditCourse from './EditCourse'
import CreateCourse from './CreateCourse'

class AdminCourses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      addingcourse: false,
      addingHoles: false,
      courseId: '',
      courseName: '',
    }
  }

  componentDidMount() {
    console.log('hi')
    axios
      .get('/api/getallcourses')
      .then((res) => {
        if (res.length === 0) {
          console.log('No courses found')
        } else {
          this.setState({ courses: res.data })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  addNewCourse = (course) => {
    let courses = null
    if (!this.state.courses) {
      courses = []
    } else {
      courses = this.state.courses
    }
    courses.push(course)
    this.setState({ courses: courses })
  }

  closeCreateModal = () => {
    this.setState({ addingcourse: false })
  }

  closeHolesModal = () => {
    this.setState({ addingHoles: false })
  }

  handleAddCourse = () => {
    if (window.location.pathname !== '/admin/createcourse') {
      console.log('adding course...')
      this.setState({ addingcourse: true })
    }
  }
  editCourse = (courseId, courseName) => {
    this.setState({
      courseId: courseId,
      courseName: courseName,
      addingHoles: true,
    })
  }

  render() {
    if (!this.state.courses) {
      return (
        <div>
          <span>No courses available</span>
          <br />
          <br />
          <Button primary onClick={this.handleAddCourse}>
            Add new Course
          </Button>
          <Modal
            size='fullscreen'
            open={this.state.addingcourse}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content>
              {
                <CreateCourse
                  closeModal={this.closeCreateModal}
                  addNewCourse={this.addNewCourse}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      )
    }
    if (this.state.courses.length === 0) {
      return <Loading />
    } else {
      const data = this.state.courses
      console.log(data)
      return (
        <div>
          <Button primary onClick={this.handleAddCourse}>
            Add new Course
          </Button>

          <br />
          <br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                <Table.HeaderCell width='3'>Name</Table.HeaderCell>
                <Table.HeaderCell width='2'>Tee</Table.HeaderCell>
                <Table.HeaderCell width='3'>Location</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((course) => {
                return (
                  <Table.Row key={course.id}>
                    <Table.Cell>
                      <Icon
                        name='edit'
                        link
                        onClick={() =>
                          this.editCourse(course.id, course.course_name)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{course.course_name}</Table.Cell>
                    <Table.Cell>{course.tee}</Table.Cell>
                    <Table.Cell>{course.country}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <Modal
            size='fullscreen'
            open={this.state.addingcourse}
            onClose={this.closeCreateModal}
          >
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content scrolling>
              {
                <CreateCourse
                  closeModal={this.closeCreateModal}
                  addNewCourse={this.addNewCourse}
                />
              }
            </Modal.Content>
          </Modal>

          <Modal
            size='fullscreen'
            open={this.state.addingHoles}
            onClose={this.close}
          >
            <Modal.Header>{this.state.courseName}</Modal.Header>
            <Modal.Content>
              {
                <EditCourse
                  closeModal={this.closeHolesModal}
                  courseId={this.state.courseId}
                  courseName={this.state.courseName}
                />
              }
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
export default AdminCourses
