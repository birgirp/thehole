import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import MenuBar from "./MenuBar/MenuBar";
import Login from "./Login";
import Home from "./Application/Home"
import AdminOverview from "./Admin/AdminOverview/AdminOverview"
import AdminUsers from "./Admin/AdminUsers/AdminUsers"
import AdminCourses from "./Admin/AdminCourses/AdminCourses"


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
  }

  changeLoggedIn(isadmin) {
    this.setState({ isLoggedIn: true });
    this.setState({ isAdmin: isadmin });

  }


  componentDidMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        console.log("Mounting app, isloggedin = " + JSON.stringify(res.data.loggedIn));
      if(res.data.loggedIn){
        this.setState({ isLoggedIn: res.data.loggedIn, isAdmin: res.data.isAdmin  });
        if (window.location.pathname !== "/home") {
          window.location = "/home";
        }
      }
      })
      .catch(err => {
        console.log(err);

      })
  }

  render() {
   /* var user = "";
    if (this.state.isLoggedIn ) {
      console.log(this.state);
      user = <MenuBar getIsAdmin={this.state.isAdmin}></MenuBar>;
    }
*/
    return (
      <Router>
        <div>
          {this.state.isLoggedIn && <MenuBar getIsAdmin={this.state.isAdmin}></MenuBar>}
          <div id="mainView">
            <Route exact path="/" component={Login} />
            <Route exact path="/home" render={(props) => <Home {...props} changeLoggedIn={this.changeLoggedIn} />} />
            <Route exact path="/admin" component={AdminOverview} />
            <Route exact path="/admin/users" component={AdminUsers} />
            <Route exact path="/admin/courses" component={AdminCourses} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;