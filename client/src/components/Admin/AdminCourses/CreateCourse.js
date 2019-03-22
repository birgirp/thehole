// External libs
import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import axios from "axios";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// Own components...
//import Loading from "../../Loading/Loading";

class CreatCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: "",
            courseName: "",
            tee: "",
        };
    }



    handleSubmit = () => {
        this.setState({ loading: true });
        axios.post("/api/addcourse", {
            courseName: this.state.courseName,
            tee: this.state.tee,
            country: this.state.country,
            holes: this.state.rowData
        })
            .then(response => {
                console.log(response);
                this.setState({ loading: false })
                this.props.closeModal();
             })
            .catch(error => {
                console.log(error);
            });
    }

handleCancel = () => {
    this.props.closeModal();
}

handleNameChange = (event) => {
    this.setState({ courseName: event.target.value });
}


handleTeeChange = (event) => {
    this.setState({ tee: event.target.value });
}

handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
}


render() {

    //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
    return (
        <div>
            <h1>  Add new Course </h1>
            <br />
            <Form>
                <Form.Group>
                    <Form.Field
                        required
                        control={Input}
                        label='Name'
                        placeholder='Name'
                        value={this.state.courseName} onChange={this.handleNameChange}
                    />
                    <Form.Field
                        required
                        control={Input}
                        label='Tee'
                        placeholder='Tee'
                        value={this.state.tee} onChange={this.handleTeeChange}
                    />
                    <Form.Field
                        required
                        control={Input}
                        label='Country'
                        placeholder='Country'
                        value={this.state.country} onChange={this.handleCountryChange}
                    />
                </Form.Group>
            </Form>
            <br />


            <Button primary onClick={this.handleSubmit}>Submit</Button>
            <Button secondary onClick={this.handleCancel}>Cancel</Button>

        </div>
    )
}
}


export default CreatCourse;