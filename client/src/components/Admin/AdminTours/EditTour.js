import React, { Component } from "react";

class EditTour extends Component {


    constructor(props) {
        super(props);
        this.state = {
            status: "",


          players: [],
          courses: [],
          rounds: []
        }
      }
    




    render() {
        return (
            <div>
                <h1>Admin Tour</h1>
            </div>
        )
    }
}

export default EditTour;