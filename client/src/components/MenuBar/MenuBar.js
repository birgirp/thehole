import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segment } from "semantic-ui-react";
import axios from "axios";


class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "home",
      isAdmin: -1
    };
  }


  handleItemClick = (e, { name }) => {
    console.log("name = " + name);
    //if(name !== "admin"){
    this.setState({ activePage: name });
    //}
  }

  handleLogoutItemClick = (e, { name }) => {
    console.log("Logging out");
    axios.get("/users/logout")
    window.location = "/"
  }


  componentWillMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        if (res.data.isAdmin) {
          this.setState({ isAdmin: 1 });
        } else {
          this.setState({ isAdmin: 0 });
        }
      })
      .catch(err => {
        console.log(err);

      })
  }

  adminMenu() {

    const { activePage } = this.state.activePage;
    return (
      <Dropdown text='Admin' name="admin" pointing className='link item'>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/admin/users"
            name="adminusers"
            content="Users"
            // active={activePage === "adminusers"}
            onClick={this.handleItemClick} />
          <Dropdown.Item
            as={Link}
            to="/admin/courses"
            name="admincourses"
            content="Courses"
            // active={activePage === "admincourses"}
            onClick={this.handleItemClick} />
          <Dropdown.Item
            as={Link}
            to="/admin/tours"
            name="admintours"
            content="Tours"
            active={activePage === "admintours"}
            onClick={this.handleItemClick} />
        </Dropdown.Menu>
      </Dropdown>


    );

  }


  render() {

    const { activePage } = this.state.activePage;


    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/home"
            name="home"
            content="Home"
            active={activePage === "home"}
            onClick={this.handleItemClick} />
          {this.props.getIsAdmin && this.adminMenu()}
          <Menu.Item
            className="right menu"
            name="logout"
            content="Logout"
            active={activePage === "logout"}
            onClick={this.handleLogoutItemClick} />
        </Menu>
      </Segment>
    )
  }

}
export default MenuBar;