import React, { Component, Link } from "react";
import axios from "axios";
import { Input, TextArea, Button, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class ViewMemo extends Component {
  state = {
    note: [],
    noteName: "",
    noteContents: "",
    noteId: "",
    submitted: false
  }

  componentDidMount() {
    console.log("it did mount");
    //  console.log(window.location.pathname.split('/')[2]);
    this.setState({ noteId: window.location.pathname.split('/')[2] });
    axios.get("/api" + window.location.pathname)
      .then(res => {
        var note = res.data;
        console.log(note);
        var noteName = note[0].name;
        var noteContents = note[0].contents;
        this.setState({ note, noteName, noteContents });
        // this.setState( { submitted: false } );


      })

  }

  handleNameChange = event => {
    let newValue = event.target.value;
    this.setState({ noteName: newValue });
  }

  handleContentsChange = event => {
    let newValue = event.target.value;
    this.setState({ noteContents: newValue });
  }

  handleSubmit = () => {

    axios.put("/api/updateMemo", {
      contents: this.state.noteContents,
      title: this.state.noteName,
      id: this.state.noteId
    })
      .then(response => {
        console.log(response);
        this.setState({ submitted: true })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClear = () => {
    this.setState({ noteContents: "", noteName: "" });
  }


  render() {
    if (this.state.submitted === true) {
      return <Redirect to='/updateMemo' />
    } else {
      return (

        <div>
          <Form>
            <h1>Breyta minnismiða {this.state.noteId}</h1>
            <h3>Titill</h3>
            <Input value={this.state.noteName} style={{ width: "100%" }} onChange={this.handleNameChange} />
            <h3>Meginmál</h3>
            <TextArea value={this.state.noteContents} style={{ width: "100%" }} onChange={this.handleContentsChange} />
            <br /><br />

            <Button primary onClick={this.handleSubmit}>Uppfæra minnismiða</Button>

            <Button secondary onClick={this.handleClear}>Hreinsa form</Button>
          </Form>
        </div>
      )
    }
  }
}


export default ViewMemo;
