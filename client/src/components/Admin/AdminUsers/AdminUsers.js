// External libs
import React, { Component } from "react";
import { Table } from "semantic-ui-react";
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
        console.log("hahha " +JSON.stringify( res.data));
        this.setState({ users: res.data })

      })
      .catch(err => {
        console.log(err);
      })
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
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>eMail</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(function (user) {
                return (
                  <Table.Row key={user.id}>
                    <Table.Cell collapsing>{user.id}</Table.Cell>
                    <Table.Cell collapsing>{user.full_name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
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