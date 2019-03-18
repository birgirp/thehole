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
  }


  componentWillMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        console.log("is admin? = " + JSON.stringify(res.data.isAdmin));
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
     
      //let isadmin = this.state.isAdmin === 1 ? true : false;
      console.log("aaaa " + this.props.getIsAdmin);

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