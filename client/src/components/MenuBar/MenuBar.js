import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segment } from "semantic-ui-react";
import axios from "axios";

class MenuBar extends Component {
  state = {
    activePage: "home",
    isAdmin: false
  }

  handleItemClick = (e, { name }) => {
    console.log("name = " + name);
    //if(name !== "admin"){
    this.setState({ activePage: name });
    //}
  }

  handleLogoutItemClick = (e, { name }) => {
    console.log("Logging out");
    axios.get("/api/logout")
  }


  componentDidMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        console.log("is admin? = " + JSON.stringify(res.data.isAdmin));
        this.setState({ isLoggedIn: res.data.isAdmin });
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
     const isadmin = this.state.isAdmin

  
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
          {isadmin === true && this.adminMenu()}
          <Menu.Item
          className="right menu"
            name="logout"
            content="Logout"
            active={activePage === "login"}
            onClick={this.handleLogoutItemClick} />
        </Menu>
      </Segment>
    )
  }
}

export default MenuBar;