import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

class MenuBar extends Component {
  state = {
    activePage: "home"
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activePage: name });
  }

  componentDidUpdate() {
    try {
     // console.log("menubar updated...");

      console.log("path: " + window.location.pathname);
      console.log("activepage: " + this.state.activePage);

      if ( this.state.activePage !== "view" && window.location.pathname === "/viewMemos") {
        console.log("I would like to change the state to view")
        this.setState({ activePage: "view" });
      }

    } catch (error) {
      console.log("Error: " + error);
    }
  }


  render() {
    const { activePage } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="Login"
            content="Login"
            active={activePage === "Login"}
            onClick={this.handleItemClick} />
          <Menu.Item
            as={Link}
            to="/viewMemos"
            name="view"
            content="Sjá minnismiða"
            active={activePage === "view"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/createMemo"
            name="create"
            content="Búa til minnismiða"
            active={activePage === "create"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/deleteMemos"
            name="delete"
            content="Eyða minnismiðum"
            active={activePage === "delete"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/updateMemo"
            name="update"
            content="Uppfæra minnismiða"
            active={activePage === "update"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/authors"
            name="authors"
            content="Höfundar"
            active={activePage === "authors"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

export default MenuBar;