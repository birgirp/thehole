// External libs
import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";

class AdminUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    console.log("admin users...")
    axios.get("/users/getAllUsers")
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleAddUser = () => {
    if (window.location.pathname !== "/admin/adduser") {
      window.location = "/admin/adduser";
    }
  }

  render() {
    if (this.state.users.length === 0) {
      return (
        <Loading />
      )
    } else {
      const data = this.state.users;
      console.log(data);
      return (
        <div>
          <Button secondary onClick={this.handleAddUser}>Add new User</Button>
          <br /><br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>eMail</Table.HeaderCell>
                <Table.HeaderCell>Handicap</Table.HeaderCell>
                <Table.HeaderCell>Is admin</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(function (user) {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell collapsing>{user.id}</Table.Cell>
                    <Table.Cell >{user.full_name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.handicap}</Table.Cell>
                    <Table.Cell>{JSON.stringify(user.is_admin)}</Table.Cell>
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
export default AdminUsers;