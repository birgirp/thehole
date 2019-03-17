import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";




class Home extends Component {
  constructor(props) {
    super(props);

  }


  componentWillMount() {

 
    axios.get("/api/isloggedin")
      .then(res => {
        let isLoggedIn = res.data.loggedIn;
        if (!isLoggedIn) {
          this.props.history.push({
            pathname: "/",
            state: { user: res.data }
          });
        }else{
          this.props.changeLoggedIn();
        }
      })
      .catch(err => {
        console.log(err);
     })
  }


  render() {
    return (


      <div>
        <h1>Home...</h1>
      </div>

    )
  }
}

export default withRouter(Home);