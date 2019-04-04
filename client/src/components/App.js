import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import MenuBar from "./MenuBar/MenuBar";
import Login from "./Login";
import Home from "./Application/Home"
import Tour from "./Application/Tour/Tour"
//import CreateUser from "./Admin/AdminUsers/CreateUser"
import AdminUsers from "./Admin/AdminUsers/AdminUsers"
import AdminCourses from "./Admin/AdminCourses/AdminCourses"
//import EditCourse from "./Admin/AdminCourses/EditCourse"
import AdminTours from "./Admin/AdminTours/AdminTours"
//import Loading from "./Loading/Loading";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      userId:null
    };

  }

  changeLoggedIn = (isadmin, userId) => {
    this.setState({ userId: userId });
    this.setState({ isLoggedIn: true });
    this.setState({ isAdmin: isadmin });


  }


  componentDidMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        if (res.data.loggedIn) {
          this.setState({ isLoggedIn: res.data.loggedIn, isAdmin: res.data.isAdmin, userId: res.data.userId });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    if (!this.state.isLoggedIn ) {
      return (
        <Router>
          <div>
            <Route exact path="/" render={(props) => <Login {...props} changeLoggedIn={this.changeLoggedIn} />} />
          </div>
        </Router>
      )
    } else if (this.state.isLoggedIn && this.state.isAdmin) {
      return (
        <Router>
          <div>
            <MenuBar getIsAdmin={this.state.isAdmin}></MenuBar>
            <div id="mainView">
              <Route exact path="/home"render={(props) => <Home {...props} userId={this.state.userId} />} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route exact path="/admin/courses" component={AdminCourses} />
              <Route exact path="/admin/tours" component={AdminTours} />
            </div>
          </div>
        </Router>
      )
    } else if (this.state.isLoggedIn && !this.state.isAdmin) {
      console.log("sdsds " + this.state.userId)
      return(
        <Router>
        <div>
          <MenuBar getIsAdmin={this.state.isAdmin}></MenuBar>
          <div id="mainView">
          <Route exact path="/home"render={(props) => <Home {...props} userId={this.state.userId} />} />
          <Route exact path="/tour/:id"render={(props) => <Tour {...props} userId={this.state.userId} />} />
          </div>
        </div>
      </Router>


      )
    }
  }
}

export default App;