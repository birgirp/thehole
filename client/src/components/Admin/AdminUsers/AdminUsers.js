// External libs
import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";

// Own components
import Loading from "../../Loading/Loading";

class AdminUsers extends Component {
    state = {
        users: []
      }


      componentDidMount() {
        axios.get("/users/getAllUsers")
          .then(res => {
            this.setState({ notes: res.data })
    
          })
          .catch(err => {
            console.log(err);
            
          })
      }




    render() {
        return (
            <div>
                <h1>Admin Users</h1>
            </div>
        )
    }
}

export default AdminUsers;