// External libs
import React, { Component } from "react";
import { Table, Button, Modal, Icon } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";
import EditCourse from "./EditCourse";
import CreateCourse from "./CreateCourse";

class AdminCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      addingcourse: false,
      addingHoles:false,
      courseId:"",
      courseName: ""
    }
  }

  componentDidMount() {
    axios.get("/api/getallcourses")
      .then(res => {
        this.setState({ courses: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  closeCreateModal = () => {
    this.setState({ addingcourse: false });
  }

  closeHolesModal = () => {
    this.setState({ addingHoles: false });
  }

  handleAddCourse = () => {
    if (window.location.pathname !== "/admin/createcourse") {
       
        this.setState({ addingcourse: true })
    }
  }
  editCourse = (courseId, courseName) => {
    this.setState({ courseId: courseId })
    this.setState({ courseName: courseName })
    this.setState({ addingHoles: true })
  }
  

  render() {
    if (this.state.courses.length === 0) {
      return (
        <Loading />
      )
    } else {
      const data = this.state.courses;
      return (
        <div>
          <Button primary onClick={this.handleAddCourse}>Add new Course</Button>
          <br /><br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                <Table.HeaderCell width='3'>Name</Table.HeaderCell>
                <Table.HeaderCell width='2'>Tee</Table.HeaderCell>
                <Table.HeaderCell width='3'>Country</Table.HeaderCell>

              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((course) => {
                return (
                  <Table.Row key={course.id}>
                    <Table.Cell ><Icon name='edit' link onClick={() => this.editCourse(course.id, course.course_name)} ></Icon></Table.Cell>
                    <Table.Cell >{course.course_name}</Table.Cell>
                    <Table.Cell >{course.tee}</Table.Cell>
                    <Table.Cell >{course.country}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Modal size="fullscreen"  open={this.state.addingcourse} onClose={this.closeCreateModal}>
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content >
              {<CreateCourse closeModal={this.closeCreateModal} />}
            </Modal.Content>
          </Modal>

          <Modal size="fullscreen"  open={this.state.addingHoles} onClose={this.close}>
            <Modal.Header>{this.state.courseName}</Modal.Header>
            <Modal.Content >
              {<EditCourse closeModal={this.closeHolesModal} courseId={this.state.courseId} courseName={this.state.courseName} />}
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
export default AdminCourses;