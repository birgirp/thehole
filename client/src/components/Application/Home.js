import React, { Component } from "react";
import axios from "axios";

 



class Home extends Component {
  constructor(props){
    super(props);

  }

    
  componentDidMount() {
    console.log("mounting home");
    console.log(this.props);
    this.props.changeLoggedIn();

    axios.get("/api/isloggedin")
      .then(res => {
        console.log(JSON.stringify(res.data));
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

export default Home;