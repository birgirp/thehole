import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import MenuBar from "./MenuBar/MenuBar";
import Login from "./Login";
import Home from "./Application/Home"
import Tour from "./Application/Tour/Tour"
import AdminUsers from "./Admin/AdminUsers/AdminUsers"
import AdminCourses from "./Admin/AdminCourses/AdminCourses"
import AdminTours from "./Admin/AdminTours/AdminTours"
import Loading from "./Loading/Loading";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      userId: null,
      isLoading: false
    };

  }

  changeLoggedIn = (isadmin, userId) => {
    this.setState({ userId: userId, isLoggedIn: true, isAdmin: isadmin }, () => this.changePath());
   
  }

  changePath = () => {
    if (window.location.pathname === "/") {
      window.location = "/home"
    }
  }

  logout = () => {
    this.setState({ userId: null, isLoggedIn: false, isAdmin: false });
  }


  componentDidMount() {
    this.setState({ isLoading: true });

   
    axios.get("/api/isloggedin")
      .then(res => {
        if (res.data.loggedIn) {
          this.setState({ isLoggedIn: res.data.loggedIn, isAdmin: res.data.isAdmin, userId: res.data.userId });
          if (window.location.pathname === "/") {
            window.location = "/home"
          }
        } else {
          if (window.location.pathname !== "/") {
            window.location = "/"
          }
        }
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    
    if (this.state.isLoading) {
      return (<Loading />)
    } else{
   
    if (!this.state.isLoggedIn) {
     
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
            <MenuBar getIsAdmin={this.state.isAdmin} logout={this.logout}></MenuBar>
            <div id="mainView">
              <Route exact path="/home" render={(props) => <Home {...props} userId={this.state.userId} />} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route exact path="/admin/courses" component={AdminCourses} />
              <Route exact path="/admin/tours" component={AdminTours} />
            </div>
          </div>
        </Router>
      )
    } else if (this.state.isLoggedIn) {
      return (
        <Router>
          <div>
            <MenuBar getIsAdmin={this.state.isAdmin} logout={this.logout}></MenuBar>
            <div id="mainView">
              <Route exact path="/home" render={(props) => <Home {...props} userId={this.state.userId} />} />
              <Route exact path="/tour/:id" render={(props) => <Tour {...props} userId={this.state.userId} />} />
            </div>
          </div>
        </Router>


      )
    }
  }
}
}

export default App;