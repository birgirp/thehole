import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Segment, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'
import CreateUser from '../Admin/AdminUsers/CreateUser.js'

class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 'home',
      isAdmin: -1,
      userName: '',
      userId: null,
      editingProfile: false,
    }
  }

  handleItemClick = (e, { name }) => {
    console.log('name = ' + name)
    //if(name !== "admin"){
    this.setState({ activePage: name })
    //}
  }

  cancelEditProfile = () => {
    this.setState({ editingProfile: false })
  }

  handleLogoutItemClick = (e, { name }) => {
    console.log('Logging out')
    this.props.logout()
  }

  handleEditProfileClick = (e, { name }) => {
    console.log('Editing profile')
    this.setState({ editingProfile: true })
  }

  componentWillMount() {
    axios
      .get('/api/isloggedin')
      .then((res) => {
        this.setState({ userName: res.data.name, userId: res.data.userId })
        if (res.data.isAdmin) {
          this.setState({ isAdmin: 1 })
        } else {
          this.setState({ isAdmin: 0 })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  adminMenu() {
    const { activePage } = this.state.activePage
    return (
      <Dropdown text='Admin' name='admin' pointing className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/admin/users'
            name='adminusers'
            content='Users'
            onClick={this.handleItemClick}
          />
          <Dropdown.Item
            as={Link}
            to='/admin/courses'
            name='admincourses'
            content='Courses'
            onClick={this.handleItemClick}
          />
          <Dropdown.Item
            as={Link}
            to='/admin/tours'
            name='admintours'
            content='Tours'
            active={activePage === 'admintours'}
            onClick={this.handleItemClick}
          />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    const { activePage } = this.state.activePage
    return (
      <div>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item
              as={Link}
              to='/home'
              name='home'
              content='Home'
              active={activePage === 'home'}
              onClick={this.handleItemClick}
            />
            {this.props.getIsAdmin && this.adminMenu()}

            <Menu.Item className='right menu'>
              <Icon name='user' style={{ marginRight: 20 }} />
              <Dropdown text={this.state.userName} pointing>
                <Dropdown.Menu>
                  <Dropdown.Item
                    name='logout'
                    active={activePage === 'logout'}
                    onClick={this.handleLogoutItemClick}
                  >
                    Logout
                  </Dropdown.Item>
                  <Dropdown.Item
                    name='editprofile'
                    active={activePage === 'editprofile'}
                    onClick={this.handleEditProfileClick}
                  >
                    Edit Profile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Segment>

        <Modal
          id='editUsersModal'
          open={this.state.editingProfile}
          onClose={this.close}
        >
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Content>
            {
              <CreateUser
                userId={this.state.userId}
                editingUser={true}
                editingProfile={true}
                cancel={this.cancelEditProfile}
              />
            }
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
export default MenuBar
