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


  render() {
    const { activePage } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            content="Forsíða"
            active={activePage === "home"}
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