// External libs
import React, { Component } from "react";
import { Button, Form, Input, Checkbox } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            email: "",
            handicap: "",
            isadmin: false,
            password1: "",
            password2: "",
            loading: false
        };
    }





   /* close = () => {
        this.setState({ open: false, loadingView: false, loading: false });
    }*/

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
            password: this.state.password1
        })
            .then(response => {
                this.setState({ full_name: "", email: "", handicap: "", isadmin: false, password2: "", });
                this.setState({ loading: false })
                console.log(response);
                this.props.closeModal();
               // window.location = "/admin/users";
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCancel = () => {
        this.props.closeModal();
     //  window.location = "/admin/users";
    }

    render() {

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                required
                                control={Input}
                                label='Name'
                                placeholder='Name'
                                value={this.state.full_name} onChange={this.handleNameChange}
                            />
                            <Form.Field
                                required
                                control={Input}
                                label='Email'
                                placeholder='Email'
                                value={this.state.email} onChange={this.handleEmailChange}
                            />
                            <Form.Field
                                required
                                control={Input}
                                label='Handicap'
                                placeholder='Hcp'
                                width={6}
                                value={this.state.handicap} onChange={this.handleHandicapChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                required
                                control={Input}
                                label='Password 1'
                                placeholder='Password 1'
                                type="password"
                                value={this.state.password1} onChange={this.handlePW1Change}
                            />
                            <Form.Field
                                required
                                control={Input}
                                label='Password 2'
                                placeholder='Password 2'
                                type="password"
                                value={this.state.password2} onChange={this.handlePW2Change}
                            />

                        </Form.Group>
                        <Form.Field
                            control={Checkbox}
                            label='Is admin'
                            placeholder='Is admin'
                            width={4}
                            checked={this.state.isadmin} onChange={this.handleCheckboxChange}
                        />
                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                        <Button secondary onClick={this.handleCancel}>Cancel</Button>
                    </Form>
                </div>
            )
        }
    }
}


export default CreateUser;