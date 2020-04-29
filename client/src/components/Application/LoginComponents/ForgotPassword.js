import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Loading from '../../Loading/Loading'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)

class ForgotPassword extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  sendEmail = async e => {
    e.preventDefault()
    const { email } = this.state
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true
      })
    } else {
      try {
        const response = await axios.post('/users/sendresetemail', {
          email
        })
        console.log(response.data)
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false
          })
        }
      } catch (error) {
        console.error(error.response.data)
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false
          })
        }
      }
    }
  }

  render() {
    const { messageFromServer, showNullError, showError } = this.state
    if (this.state.isLoading) {
      return <Loading />
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
          <div>
            <Grid id='ChangePasswordForm' columns='equal'>
              <Grid.Column />
              <Grid.Column id='changepsw'>
                <Header as='h2' textAlign='center' color='violet'>
                  Change Password
                </Header>
                <Segment>
                  <Form size='mini'>
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Email address'
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                    />
                    <Button
                      color='blue'
                      onClick={this.sendEmail}
                      disabled={!emailRegex.test(this.state.email)}
                    >
                      Send password reset email
                    </Button>
                    <br />
                    <br />
                    <Button as={Link} to='/' negative>
                      {
                        (this.state,
                        messageFromServer === 'recovery email sent'
                          ? 'Close'
                          : 'Cancel')
                      }
                    </Button>

                    {showNullError && (
                      <div>
                        <p>The email address cannot be null.</p>
                      </div>
                    )}
                    {showError && (
                      <div>
                        <p>
                          That email address isn&apos;t recognized. Please try
                          again.
                        </p>
                      </div>
                    )}
                    {messageFromServer === 'recovery email sent' && (
                      <div>
                        <p>Password Reset Email Successfully Sent!</p>
                      </div>
                    )}
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column />
            </Grid>
          </div>
        </div>
      )
    }
  }
}
export default ForgotPassword
