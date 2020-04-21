import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Loading from '../../Loading/Loading'

class ResetPassword extends Component {
  state = {
    userId: '',
    password1: '',
    password2: '',
    updated: false,
    isLoading: false,
    error: false,
    passwordOk: false
  }

  componentDidMount() {
    console.log('hey!')

    const {
      match: {
        params: { token }
      }
    } = this.props

    axios
      .post('/users/reset', {
        token: token
      })
      .then(response => {
        console.log('response.data')
        console.log(response.data)

        if (response.data.message === 'password reset link ok') {
          this.setState({
            userId: response.data.userId,
            updated: false,
            isLoading: false,
            error: false
          })
        } else {
          this.setState({
            updated: false,
            isLoading: false,
            error: true
          })
        }
      })
      .catch(error => {
        console.log('errrrrr')
        console.log(error.response.data)
        this.setState({
          updated: false,
          isLoading: false,
          error: true
        })
      })
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => this.validatePassword()
    )
  }

  validatePassword = () => {
    let p1 = this.state.password1
    let p2 = this.state.password2
    let okLength = p1.length > 5 ? true : false
    let okEqual = p1 === p2 ? true : false
    let ok = okLength & okEqual
    this.setState({ passwordOk: ok })
  }

  updatePassword = async e => {
    e.preventDefault()
    const { userId, password1 } = this.state
    console.log('changing passwwww')
    try {
      const response = await axios.post('/users/changepassword', {
        userId: userId,
        password: password1
      })

      console.log('response.data')
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
      console.log(error)
      console.log(error.response.data)
    }
  }

  render() {
    let { error, isLoading, updated } = this.state

    if (isLoading) {
      return <Loading />
    } else if (error) {
      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
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
          <br></br>
          <br></br>
          <br></br>
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
                    type='password'
                    iconPosition='left'
                    placeholder='Password'
                    value={this.state.password1}
                    onChange={this.handleChange('password1')}
                  />
                  <Form.Input
                    fluid
                    type='password'
                    iconPosition='left'
                    placeholder='Repeat password'
                    value={this.state.password2}
                    onChange={this.handleChange('password2')}
                  />
                  <Button
                    color='blue'
                    onClick={this.updatePassword}
                    disabled={!this.state.passwordOk}
                  >
                    Change Password
                  </Button>
                  <br />
                  <br />
                  <Button as={Link} to='/' negative>
                    Cancel
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
