import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

class AdminMenuBar extends Component {
  state = {
    activePage: "overview"
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activePage: name });
  }

  componentDidUpdate() {
   /* try {
     // console.log("menubar updated...");

      console.log("path: " + window.location.pathname);
      console.log("activepage: " + this.state.activePage);

      if ( this.state.activePage !== "view" && window.location.pathname === "/viewMemos") {
        console.log("I would like to change the state to view")
        this.setState({ activePage: "view" });
      }

    } catch (error) {
      console.log("Error: " + error);
    }*/
  }


  render() {
    const { activePage } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/admin"
            name="overview"
            content="Admin Home"
            active={activePage === "overview"}
            onClick={this.handleItemClick} />
          <Menu.Item
            as={Link}
            to="/admin/users"
            name="adminusers"
            content="User management"
            active={activePage === "adminusers"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/admin/courses"
            name="corses"
            content="course management"
            active={activePage === "admincourses"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/admin/competitions"
            name="admincompetitions"
            content="Competitions"
            active={activePage === "delete"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default AdminMenuBar;