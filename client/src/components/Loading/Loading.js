import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div>
        <div className="loader"></div>
        <br />
        <p style={{ textAlign: "center" }}>Wait a moment...</p>
      </div>
    )
  }
}

export default Loading;