// External libs
import React, { Component } from "react";
import { Table, Button, Modal } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";
import CreateCourse from "./CreateCourse";

class AdminCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      addingcourse: false
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

  close = () => {
    this.setState({ addingcourse: false });
  }

  handleAddCourse = () => {
    if (window.location.pathname !== "/admin/addcourse") {
        this.setState({ addingcourse: true })
    }
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
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Tee</Table.HeaderCell>
                <Table.HeaderCell>Country</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(function (course) {
                return (
                  <Table.Row key={course.id}>
                    <Table.Cell >{course.course_name}</Table.Cell>
                    <Table.Cell >{course.tee}</Table.Cell>
                    <Table.Cell >{course.country}</Table.Cell>

                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Modal  id="adminUsersModal"  open={this.state.addingcourse} onClose={this.close}>
            <Modal.Header>Add new course</Modal.Header>
            <Modal.Content >
              {<CreateCourse />}
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
export default AdminCourses;