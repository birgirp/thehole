import React, { Component } from "react";
//import { Tab, Form, Input, Dropdown } from "semantic-ui-react";
//import axios from "axios";
import Loading from "../../Loading/Loading";

class TourEclectic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: "",
            rounds: 0,
            players: [],
            courses: [],
            isLoading: false,
            tourNotFound: false
        }
    }

    componentDidMount() {

    }





    render() {

        console.log(this.state)
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1> Eclectic </h1>
                    <br />
                 
                    <br />


                </div>
            )
        }
    }
}

export default TourEclectic;