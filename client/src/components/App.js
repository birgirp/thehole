import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import MenuBar from "./MenuBar/MenuBar";
import Home from "./Home/Home";
import ViewMemos from "./Memos/ViewMemos/ViewMemos";
import ViewMemo from "./Memos/ViewMemo/ViewMemo";
import CreateMemo from "./Memos/CreateMemo/CreateMemo";
import UpdateMemo from "./Memos/UpdateMemo/UpdateMemo";
import DeleteMemos from "./Memos/DeleteMemos/DeleteMemos";
import Authors from "./Authors/Authors";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <MenuBar />
          <div id="mainView">
            <Route exact path="/" component={Home} />
            <Route path="/viewMemos" component={ViewMemos} />
            <Route path="/viewMemo" component={ViewMemo} />
            <Route path="/createMemo" component={CreateMemo} />
            <Route path="/updateMemo" component={UpdateMemo} />
            <Route path="/deleteMemos" component={DeleteMemos} />
            <Route path="/authors" component={Authors} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;