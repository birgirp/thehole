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

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
     this.changeLoggedIn = this.changeLoggedIn.bind(this);
  }

  changeLoggedIn() {
    this.setState({ isLoggedIn: true });

  }

  componentDidMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        console.log("Mounting app, isloggedin = " + JSON.stringify(res.data.loggedIn));
        this.setState({ isLoggedIn: res.data.loggedIn });
      })
      .catch(err => {
        console.log(err);

      })
  }

  componentWillMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        this.setState({ isLoggedIn: res.data.loggedIn });
      }).catch(err => {
        console.log(err);
      })
  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;
    return (
      <Router>
        <div>
          {isLoggedIn === true && <MenuBar />}
          <div id="mainView">
            <Route exact path="/" component={Login} />
            <Route exact path="/home"  render={(props) => <Home {...props} changeLoggedIn= {this.changeLoggedIn} />}/>
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