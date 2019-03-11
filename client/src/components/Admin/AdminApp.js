import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import AdminMenuBar from "./AdminMenuBar";
import AdminOverview from "./AdminOverview/AdminOverview";
import AdminCompetitions from "./AdminCompetitions/AdminCompetitions";
import AdminUsers from "./AdminUsers/AdminUsers";
import AdminCourses from "./AdminCourses/AdminCourses";



class AdminApp extends Component {
  render() {
    return (
      <Router>
        <div>
        <AdminMenuBar />
          <div id="mainView">
            <Route exact path="/admin" component={AdminOverview} />
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin/courses" component={AdminCourses} />
            <Route path="/admin/competitions" component={AdminCompetitions} />
          </div>
        </div>
      </Router>
    )
  }
}

export default AdminApp;