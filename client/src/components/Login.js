import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import ReactDOM from "react-dom";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Modal,
  Message
} from 'semantic-ui-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../index.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    submitting: false,
    unknownuser: false,
    success: false
  }

  close = () => {
    this.setState({ unknownuser: false, password: '' })
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = () => {
    axios
      .post('/users/login/', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.user === false) {
          this.setState({ unknownuser: true })
        } else {
          this.setState({ success: true })
          this.props.changeLoggedIn(
            response.data.user.is_admin,
            response.data.user.id
          )
        }
      })
      .catch(error => {
        console.log(error)
      })

    // this.setState({ submitting: false });
  }

  render() {
    /* if (this.state.success === true) {
      return <Redirect to='/home' />
    } else */ {
      let imgUrl = './hole.png'
      const divStyle = {
        color: 'black',
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        height: '100vh'
      }

      return (
        <div style={divStyle}>
          <br />
          <br />
          <br />
          <br />
          <Grid id='loginForm' centered columns={2}>
            <Grid.Column id='loginBox'>
              <Header as='h2' textAlign='center' color='violet'></Header>
              <Segment>
                <Form size='large'>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Email address'
                    value={this.state.email}
                    //pattern=""
                    onChange={this.handleEmailChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <Button
                    color='blue'
                    fluid
                    size='large'
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>

                  {this.state.unknownuser && (
                    <div>
                      <h3>Unknown username or password</h3>
                      <Button as={Link} to='/forgotpassword'>
                        Reset password
                      </Button>
                    </div>
                  )}
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>

          <Modal
            id='loginErrorModal'
            size='tiny'
            open={this.state.f}
            onClose={this.close}
          >
            <Modal.Content>
              <Message
                error
                header='Unknown username or password'
                content='You can only log in with valid account.'
              />
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

export default withRouter(Login)
