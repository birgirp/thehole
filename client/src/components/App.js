import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import Login from "./Login";
import Home from "./Application/Home"
import AdminApp from "./Admin/AdminApp"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="mainView">
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/admin" component={AdminApp} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;