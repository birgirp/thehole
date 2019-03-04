// External libs
import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
//import { Link } from "react-router-dom";

// Own components
import Loading from "../../Loading/Loading";

class UpdateMemo extends Component {
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
                  <Table.Row key={memo.id}>
                    <Table.Cell collapsing><a href={`/ViewMemo/${memo.id}`}>{memo.id}</a></Table.Cell>
                    <Table.Cell collapsing>{memo.name}</Table.Cell>
                    <Table.Cell>{memo.contents}</Table.Cell>
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

export default UpdateMemo;