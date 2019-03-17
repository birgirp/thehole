// External libs
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, TextArea, Input, Modal } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";

class CreateMemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: "",
      title: "",
      loadingView: false,
      open: false,
      loading: false
    };
  }

  close = () => {
    this.setState({ open: false, loadingView: false, loading: false });
  }

  handleContentsChange = (event) => {
    this.setState({ contents: event.target.value });
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  navigateAway = () => {

  }

  handleSubmit = () => {
    this.setState({ loadingView: true, loading: true });
    axios.post("/api/createMemo", {
      contents: this.state.contents,
      title: this.state.title
    })
      .then(response => {
        this.setState({ loading: false, open: true })
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClear = () => {
    this.setState({ contents: "", title: "" });
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
          <Modal size="tiny" open={this.state.open} onClose={this.close}>
            <Modal.Header>Minnisblað vistað</Modal.Header>
            <Modal.Content>
              <p>Viltu fara á yfirlitssíðu minnisblaða eða skrifa nýtt minnisblað?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.close}>Skrifa nýtt minnisblað</Button>
              <Link to="/viewMemos">
                <Button positive icon="checkmark" labelPosition="right" content="Fara á yfirlitssíðu" />
              </Link>
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
    else {
      return (
        <div>
          <Form>
            <h3>Titill</h3>
            <Input value={this.state.title} onChange={this.handleTitleChange} placeholder="Skrifaðu titil hér" style={{ width: "100%" }} />
            <br />
            <h3>Meginmál</h3>
            <TextArea value={this.state.contents} onChange={this.handleContentsChange} placeholder="Skrifaðu minnismiða hér" />
            <br /><br />
            <Button primary onClick={this.handleSubmit}>Senda minnismiða</Button>
            <Button secondary onClick={this.handleClear}>Hreinsa form</Button>
          </Form>
        </div>
      )
    }
  }
}

export default CreateMemo;