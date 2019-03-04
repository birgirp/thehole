// External libs
import React, { Component } from "react";
import { Modal, Button, Table, Checkbox } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";

class DeleteMemos extends Component {
  state = {
    loadingView: true,
    loading: true,
    openModal: false,
    memos: [],
    memosToDelete: []
  }

  componentDidMount() {
    this.getMemos();
  }

  getMemos = () => {
    axios.get("/api/getMemos")
      .then(res => {
        this.setState({ loadingView: false, loading: false, memos: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  appendToDelete = id => {
    let array = this.state.memosToDelete;

    // delete element from array if it is there already (unselect action)
    if (array.includes(id)) {
      var index = array.indexOf(id);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    // if element is not in array, we push it there (select action)
    else {
      array.push(id);
    }

    this.setState({ memosToDelete: array });
  }

  deleteMemos = () => {
    this.setState({ loadingView: true, loading: true });
    axios.delete("/api/deleteMemos", { data: this.state.memosToDelete })
      .then(res => {
        this.setState({ loading: false, openModal: true })
      })
      .catch(err => {
        console.log(err);
      })
  }

  closeModal = () => {
    this.setState({ loadingView: true, loading: true, openModal: false, memos: [], memosToDelete: [] });
    this.getMemos();
  }

  render() {
    let loadingSpinner;
    if (this.state.loadingView) {

      if (this.state.loading) {
        loadingSpinner = <Loading />;
      }

      return (
        <div>
          {loadingSpinner}
          <Modal size="tiny" open={this.state.openModal} onClose={this.closeModal}>
            <Modal.Header>Minnisblöðum eytt</Modal.Header>
            <Modal.Content>
              <p>Minnisblöðunum hefur verið eytt.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button primary onClick={this.closeModal}>Áfram</Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
    
    else {
      const data = this.state.memos;
      return (
        <div>
          <h3>Veldu minnismiða sem á að eyða og ýttu svo á takkann fyrir neðan töfluna</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Delete?</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Nafn</Table.HeaderCell>
                <Table.HeaderCell>Innihald</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map(memo => {
                return (
                  <Table.Row key={memo.id}>
                    <Table.Cell collapsing>
                      <Checkbox onClick={() => this.appendToDelete(memo.id)} style={{ padding: 0, marginTop: 0, marginBottom: 0, marginLeft: "30%" }} />
                    </Table.Cell>
                    <Table.Cell collapsing>{memo.id}</Table.Cell>
                    <Table.Cell collapsing>{memo.name}</Table.Cell>
                    <Table.Cell>{memo.contents}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Button primary onClick={this.deleteMemos}>Eyða völdum miðum</Button>
          <br /><br />
        </div>
      )
    }
  }
}

export default DeleteMemos;