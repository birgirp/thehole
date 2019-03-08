import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import MenuBar from "./MenuBar/MenuBar";
import Login from "./Home/Login";
import ViewMemos from "./Memos/ViewMemos/ViewMemos";
import ViewMemo from "./Memos/ViewMemo/ViewMemo";
import CreateMemo from "./Memos/CreateMemo/CreateMemo";
import UpdateMemo from "./Memos/UpdateMemo/UpdateMemo";


class LoginPage extends Component {
  render() {
    return (


        <Login />


    )
  }
}

export default LoginPage;