import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div>
        <div className="loader"></div>
        <br />
        <p style={{ textAlign: "center" }}>Hinkraðu augnablik ...</p>
      </div>
    )
  }
}

export default Loading;