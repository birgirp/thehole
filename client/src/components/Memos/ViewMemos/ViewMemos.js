// External libs
import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";

class ViewMemos extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    axios.get("/api/getMemos")
      .then(res => {
        this.setState({ notes: res.data })

      })
      .catch(err => {
        console.log(err);
        
      })
  }

  render() {
    if (this.state.notes.length === 0) {
      return (
        <Loading />
      )
    } else {
      const data = this.state.notes;
      console.log(data);
      return (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Nafn</Table.HeaderCell>
                <Table.HeaderCell>Innihald</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(function (memo) {
                return (
                  <Table.Row key={memo[0]}>
                    <Table.Cell collapsing>{memo[0]}</Table.Cell>
                    <Table.Cell collapsing>{memo[1]}</Table.Cell>
                    <Table.Cell>{memo[2]}</Table.Cell>
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

export default ViewMemos;