// External libs
import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";

class AdminCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }

  componentDidMount() {
    console.log("admin courses...")
    axios.get("/api/getallcourses")
      .then(res => {
        this.setState({ courses: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleAddCourse = () => {
    if (window.location.pathname !== "/admin/addcourse") {
      window.location = "/admin/addcourse";
    }
  }

  render() {
    if (this.state.courses.length === 0) {
      return (
        <Loading />
      )
    } else {
      const data = this.state.courses;
      console.log(data);
      return (
        <div>
          <Button secondary onClick={this.handleAddCourse}>Add new Course</Button>
          <br /><br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Country</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(function (course) {
                return (
                  <Table.Row key={course.id}>
                    <Table.Cell >{course.course_name}</Table.Cell>
                    <Table.Cell >{course.country}</Table.Cell>

                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

        </div>
      )
    }
  }
}
export default AdminCourses;