import React, { Component } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Modal,
  Message
} from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading"

const title = {
  pageTitle: "Forgot Password Screen"
};

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false
    };
  }

  handleChange = name => event => {
    console.log(name);
    this.setState({
      [name]: event.target.value
    });
  };

  cancel = () => {};

  sendEmail = async e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3003/forgotPassword",
          {
            email
          }
        );
        console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div>
          <div>
            <Grid id="ChangePasswordForm" centered columns={1}>
              <Grid.Column id="changepsw">
                <Header as="h2" textAlign="center" color="violet">
                  Change Password
                </Header>
                <Segment>
                  <Form size="large">
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Email address"
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />

                    <Button
                      color="blue"
                      fluid
                     
                      onClick={this.sendEmail}
                    >
                      Send request
                    </Button>
                    <Button
                      negative={true}
                      fluid
                     
                      onClick={this.cancel}
                    >
                      Cancel
                    </Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
          {showNullError && (
            <div>
              <p>The email address cannot be null.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That email address isn&apos;t recognized. Please try again.
              </p>
            </div>
          )}
          {messageFromServer === "recovery email sent" && (
            <div>
              <h3>Password Reset Email Successfully Sent!</h3>
            </div>
          )}
        </div>
      );
    }
  }
}
export default ForgotPassword;
