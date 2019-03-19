import React, { Component } from "react";
//import ReactDOM from "react-dom";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react';
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";



class Login extends Component {
  state = {
    email: "",
    password: "",
    submitting: false,
    unknownuser: false,
    success: false
  }


  close = () => {
    this.setState({ unknownuser: false, password: "" });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = () => {
    this.setState({ submitting: true });
   
    axios.post("/users/login/", {email: this.state.email, password: this.state.password})
      .then(response => {
        console.log("response = " + JSON.stringify(response.data.user));
       
        if (response.data.user === false){
          this.setState({ unknownuser: true });
        }else{
         this.setState({ success: true });
         this.props.changeLoggedIn(response.data.user.is_admin);
       /* this.props.history.push({
          pathname: "/home",
          state: { user: response.data }
        });*/
      }
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ submitting: false });
  }


  unKnownUser(){
    return(
      <div>
      <Modal size="tiny" open={this.state.unknownuser} onClose={this.close}>
        <Modal.Header>Unknown user</Modal.Header>
        <Modal.Content>
          <p>Unknown username or password</p>
        </Modal.Content>

      </Modal>
    </div>

    )
  }


  render() {
    if (this.state.unknownuser === true) {
      return (
        this.unKnownUser()
      )
    } else {
      if (this.state.success === true) {
        return <Redirect to='/home' />
      } else {
        return (
          <div>

<Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>

            <br /><br />
            <Grid centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center">
                  Login
                </Header>
                <Segment>
                  <Form size="large">
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Email address"
                      value={this.state.email}
                      //pattern=""
                      onChange={this.handleEmailChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />

                    <Button color="blue" fluid size="large" onClick={this.handleSubmit}>
                      Login
                    </Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        )
      }
    }
  }
}

export default withRouter(Login);