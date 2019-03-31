import React, { Component } from "react";
import {  Button, Modal } from "semantic-ui-react";
//import axios from "axios";

// Own components
//import Loading from "../../Loading/Loading";
import CreateTour from "./CreateTour"

class AdminTours extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tours: [],
            isCreatingTour: false
        }
    }

    componentDidMount() {

    }

    closeCreateModal = () => { this.setState({isCreatingTour : false}) }
    handleAddCourse = (e) => { this.setState({isCreatingTour : true}) }


    render() {
        return (
            <div>
                <h1>Admin Tour</h1>
                <Button primary onClick={this.handleAddCourse}>Add new Course</Button>

                <Modal size="fullscreen" open={this.state.isCreatingTour} onClose={this.closeCreateModal}>
                    <Modal.Header>Add new Tour</Modal.Header>
                    <Modal.Content >
                        {<CreateTour closeModal={this.closeCreateModal} />}
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default AdminTours;