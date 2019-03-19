// External libs
import React, { Component } from "react";
import { Button, Form, Input, TextArea, Select } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";

class CreatCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course_name: "",
            country: "",
            tee: "",
            loading: false
        };
    }





    close = () => {
        this.setState({ open: false, loadingView: false, loading: false });
    }

    handleNameChange = (event) => {
        this.setState({ full_name: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleHandicapChange = (event) => {
        this.setState({ handicap: event.target.value });
    }

    handlePW1Change = (event) => {
        this.setState({ password1: event.target.value });
    }

    handlePW2Change = (event) => {
        this.setState({ password2: event.target.value });
    }

    handleCheckboxChange = (event, value) => {
        console.log(value.checked);
        this.setState({ isadmin: value.checked })
    }

    navigateAway = () => {
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        axios.post("/users/createUser", {
            full_name: this.state.full_name,
            email: this.state.email,
            handicap: parseFloat(this.state.handicap),
            isadmin: this.state.isadmin,
            password: this.state.password1,
        })
            .then(response => {
                this.setState({ loading: false })
                console.log(response);
                this.setState({ full_name: "", email: "", handicap: "", isadmin: false, password2: "", });
                window.location = "/admin/users";
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCancel = () => {
        window.location = "/admin/courses";
    }



    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {

            const genderOptions = [
                { key: 'm', text: 'Male', value: 'male' },
                { key: 'f', text: 'Female', value: 'female' },
            ]
            return (
                <div>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                label='First name'
                                placeholder='First name'
                            />
                            <Form.Field
                                id='form-input-control-last-name'
                                control={Input}
                                label='Last name'
                                placeholder='Last name'
                            />
                            <Form.Field
                                control={Select}
                                options={genderOptions}
                                label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                                placeholder='Gender'
                                search
                                searchInput={{ id: 'form-select-control-gender' }}
                            />
                        </Form.Group>
                        <Form.Field
                            id='form-textarea-control-opinion'
                            control={TextArea}
                            label='Opinion'
                            placeholder='Opinion'
                        />
                        <Form.Field
                            id='form-button-control-public'
                            control={Button}
                            content='Confirm'
                            label='Label with htmlFor'
                        />
                    </Form>
                </div>
            )
        }
    }
}


export default CreatCourse;