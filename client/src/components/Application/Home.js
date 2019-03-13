import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    
    
  componentDidMount() {
    axios.get("/api/isloggedin")
      .then(res => {
        console.log(JSON.stringify(res.data));
      })
      .catch(err => {
       console.log(err);
        
      })
  }
    render() {

        console.log(this.props.location.state.user);
        //console.log(this.props.location.state.type);
        return (
            <div>
                <h1>Home...</h1>
            </div>
        )
    }
}

export default Home;