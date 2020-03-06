import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Loading from '../../Loading/Loading'

class ResetPassword extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false
    }
  }

  async componentDidMount() {
    console.log('heyyyyy')
    const {
      match: {
        params: { token }
      }
    } = this.props

    console.log(token)
    try {
      const response = await axios.get('http://localhost:3003/reset', {
        params: {
          resetPasswordToken: token
        }
      })
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false
        })
      }
    } catch (error) {
      console.log(error.response.data)
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      })
    }
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => console.log(this.state)
    )
  }

  updatePassword = async e => {
    e.preventDefault()
    const { username, password } = this.state
    const {
      match: {
        params: { token }
      }
    } = this.props
    try {
      const response = await axios.put(
        'http://localhost:3003/updatePasswordViaEmail',
        {
          username,
          password,
          resetPasswordToken: token
        }
      )
      console.log(response.data)
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false
        })
      } else {
        this.setState({
          updated: false,
          error: true
        })
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }

  render() {
    const { error, isLoading, updated } = this.state

    if (isLoading) {
      return <Loading />
    } else if (error) {
      return (
        <div>
          <Grid id='ResetError' columns='equal'>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <h4>
                Problem resetting password. Please send another reset link.
              </h4>
              <Button as={Link} to='/forgotpassword'>
                Reset password
              </Button>
              <Button as={Link} to='/'>
                Home
              </Button>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <Grid id='ResetForm' columns='equal'>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Header as='h2' textAlign='center' color='violet'>
                Change Password
              </Header>
              <Segment>
                <Form size='mini'>
                  <Form.Input
                    fluid
                    icon='password'
                    iconPosition='left'
                    placeholder='Password'
                    value={this.state.password1}
                    onChange={this.handleChange('password1')}
                  />
                  <Form.Input
                    fluid
                    icon='password2'
                    iconPosition='left'
                    placeholder='Repeat password2'
                    value={this.state.email}
                    onChange={this.handleChange('password2')}
                  />
                  <Button
                    color='blue'
                    onClick={this.changePAssword}
                    disabled={false}
                  >
                    Change Password
                  </Button>
                  <br />
                  <br />
                  <Button as={Link} to='/' negative>
                    Home
                  </Button>
                </Form>
                {updated && (
                  <div>
                    <p>
                      Your password has been successfully reset, please try
                      logging in again.
                    </p>
                  </div>
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

export default ResetPassword
