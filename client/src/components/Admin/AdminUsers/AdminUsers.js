// External libs
import React, { Component } from "react";
import { Table, Button, Modal, Icon } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";
import CreateUser from "./CreateUser"


class AdminUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      addinguser: false,
      deletingUser: false,
      editingUser: false,
      editingUserId: null
    }
  }

  isLoggedIn = (userId) => {
    axios.get("/api/isloggedin")
      .then(res => {
        return (res.data.loggedIn)
      }).catch(err => {
        console.log(err);
      })


  }


  getAllUsers = () => {
    console.log("getting usersss...")
    this.setState({ loading: true });
    axios.get("/users/getAllUsers")
      .then(res => {
        this.setState({ users: res.data })
        this.setState({ loading: false });
      }).catch(err => {
        console.log(err);
      })

  }

  componentDidMount() {

    this.getAllUsers();
  }

  handleAddUser = () => {
    this.setState({ addinguser: true });
  }

  close = () => {
    if (this.state.addinguser) {
      this.setState({ addinguser: false });
    } else if (this.state.editingUser) {
      this.setState({ editingUser: false });
    }
    // this.getAllUsers();
  }

  editUser = (user) => {
    this.setState({ editingUser: true });
    this.setState({ editingUserId: user.id });
  }

  deleteUser = (userId) => {
    console.log("userid = " + userId);
    if (!this.isLoggedIn(userId)) {
      this.setState({ deletingUser: true });
      axios.post("/users/deleteuser", {
        userId: userId
      }).then(response => {
        this.setState({ deletingUser: false });
        console.log(response);
        this.getAllUsers();
      }).catch(error => {
        this.setState({ deletingUser: false });
        console.log(error);
      });
    }
  }


  render() {

    if (this.state.users.length === 0 || this.state.deletingUser || this.state.loading) {
      return (<Loading />)
    }
    else {
      const data = this.state.users;
      return (
        <div>
          <h1>Admin Users</h1>
          <br />
          <Button primary onClick={this.handleAddUser}>Add new User</Button>
          <br /><br />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width='1'>Delete</Table.HeaderCell>
                <Table.HeaderCell width='1'>Edit</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>eMail</Table.HeaderCell>
                <Table.HeaderCell>Handicap</Table.HeaderCell>
                <Table.HeaderCell>Is admin</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((user) => {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell ><Icon name='delete' link onClick={() => this.deleteUser(user.id)} ></Icon></Table.Cell>
                    <Table.Cell ><Icon name='edit' link onClick={() => this.editUser(user)} ></Icon></Table.Cell>
                    <Table.Cell >{user.full_name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.handicap}</Table.Cell>
                    <Table.Cell>{JSON.stringify(user.is_admin)}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>

          <Modal id="adminUsersModal" open={this.state.addinguser} onClose={this.close}>
            <Modal.Header>Create New User</Modal.Header>
            <Modal.Content >
              {<CreateUser closeModal={this.close} reloadUsers={this.getAllUsers} editingUser={false} />}
            </Modal.Content>
          </Modal>

          <Modal id="editUsersModal" open={this.state.editingUser} onClose={this.close}>
            <Modal.Header>Edit User</Modal.Header>
            <Modal.Content >
              {<CreateUser closeModal={this.close} reloadUsers={this.getAllUsers} userId={this.state.editingUserId} editingUser={true} />}
            </Modal.Content>
          </Modal>

        </div>
      )
    }
  }
}
export default AdminUsers;