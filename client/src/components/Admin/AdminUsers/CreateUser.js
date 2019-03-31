// External libs
import React, { Component } from "react";
import { Button, Form, Input, Checkbox, Grid } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";
import "./createUser.css";
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    console.log(rest)
    // validate the form was filled out
    Object.values(rest).forEach(val => {
        ( val === "") && (valid = false);
        
    });

    return valid;
};

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editingUser: false,
            editingUserId: null,
            fullName: "",
            email: "",
            handicap: "",
            isadmin: false,
            password: "",
            loading: false,

            formErrors: {
                fullName: "",
                email: "",
                handicap: "",
                password: ""

            }
        };
    }

    getAllUsers = () => {

        this.setState({ loading: true });
        axios.get("/users/getAllUsers")
            .then(res => {
                this.setState({ users: res.data })
                this.setState({ loading: false });
            }).catch(err => {
                console.log(err);
            })

    }


    componentDidMount() {
     //   console.log(this.props.users)
        if (this.props.editingUser) {
            this.setState({ editingUser: true });
            this.setState({ editingUserId: this.props.userId });
            axios.post("/users/getuser", {
                userId: this.props.userId
            }).then(response => {
                console.log(response.data);
                this.setState({ handicap: response.data.handicap, email: response.data.email, fullName: response.data.full_name, isadmin: response.data.is_admin });
            }).catch(error => {
                console.log(error);
            });
        }
    }



    handleCheckboxChange = (event, value) => {
        console.log(value.checked);
        this.setState({ isadmin: value.checked })
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "fullName":
                formErrors.fullName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "handicap":
                formErrors.handicap =
                    isNaN(value) ? "Handicap must be a number" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        if (formValid(this.state)) {
            this.setState({ loading: true });
            if (this.state.editingUser) {
                axios.post("/users/edituser", {
                    userId: this.props.userId,
                    fullName: this.state.fullName,
                    email: this.state.email,
                    handicap: parseFloat(this.state.handicap),
                    isadmin: this.state.isadmin,
                    password: this.state.password
                }).then(response => {
                    console.log(response);
                    let user = { id: this.props.userId, full_name: this.state.fullName, email: this.state.email, handicap: parseFloat(this.state.handicap), is_admin: this.state.isadmin }
                    this.props.editUserFields(user)
                    this.setState({ loading: false }, () => this.props.closeModal());
                }).catch(error => {
                    console.log(error);
                });

            } else {
                axios.post("/users/createUser", {
                    fullName: this.state.fullName,
                    email: this.state.email,
                    handicap: parseFloat(this.state.handicap),
                    isadmin: this.state.isadmin,
                    password: this.state.password
                }).then(response => {
                    console.log(response.data.id);
                    let user = { id: response.data.id, full_name: this.state.fullName, email: this.state.email, handicap: parseFloat(this.state.handicap), is_admin: this.state.isadmin }
                    this.props.addNewUser(user)
                    this.setState({ loading: false }, () => this.props.closeModal());
                }).catch(error => {
                    console.log(error);
                });
            }
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.cancel();
    }

    render() {

        // {formErrors.handicap.length > 0 && (<span className="errorMessage">{formErrors.handicap}</span>)}
        let formErrors = this.state.formErrors

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>

                    <Form>
                        <Form.Group widths='equal'>
                            <Grid style={{ width: "95%", marginLeft: "5%" }}>
                                <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
                                    <Grid.Column>
                                        <Form.Field

                                            name='fullName'
                                            control={Input}
                                            label='Name'
                                            placeholder='Name'
                                            value={this.state.fullName} onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form.Field

                                            name='email'
                                            control={Input}
                                            label='Email'
                                            placeholder='Email'
                                            value={this.state.email} onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                                    <Grid.Column>
                                        {formErrors.fullName.length > 0 && (<span className="errorMessage">{formErrors.fullName}</span>)}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row columns={2} style={{ paddingBottom: 0 }}>
                                    <Grid.Column width={4}>
                                        <Form.Field
                                            name='handicap'
                                            control={Input}
                                            label='Handicap'
                                            placeholder='Hcp'
                                            value={this.state.handicap} onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Form.Field
                                            name='password'
                                            control={Input}
                                            label='Password'
                                            placeholder='Password'
                                            value={this.state.password} onChange={this.handleChange}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} style={{ paddingTop: 0 }}>
                                    <Grid.Column>
                                        {formErrors.handicap.length > 0 && (<span className="errorMessage">{formErrors.handicap}</span>)}
                                    </Grid.Column>
                                    <Grid.Column>
                                        {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <Form.Field
                                            control={Checkbox}
                                            label='Is admin'
                                            placeholder='Is admin'
                                            checked={this.state.isadmin} onChange={this.handleCheckboxChange}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                <Grid.Column>
                                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                                        <Button secondary onClick={this.handleCancel}>Cancel</Button>
                                    </Grid.Column>

                                </Grid.Row>
                            </Grid>
                        </Form.Group>
                    </Form>
                </div>
            )
        }
    }
}


export default CreateUser;