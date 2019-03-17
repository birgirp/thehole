// External libs
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, TextArea, Input, Modal } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";

class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      handicap: 0,
      password1: "",
      password2: ""

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

      return (
        <div>
          <Form>
            <h3>Name</h3>
            <Input value={this.state.full_name} onChange={this.handleNameChange} placeholder="Name" style={{ width: "100%" }} />
            <br />
            <h3>Email</h3>
            <Input value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
            <br /><br />
            <Button primary onClick={this.handleSubmit}>Senda minnismiða</Button>
            <Button secondary onClick={this.handleClear}>Hreinsa form</Button>
          </Form>
        </div>
      )
    }
  }
}

export default CreateUser;