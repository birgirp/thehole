// External libs
import React, { Component } from "react";
import { Button, Form, Input, Checkbox } from "semantic-ui-react";
import axios from "axios";

// Own components...
import Loading from "../../Loading/Loading";

/*const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );*/

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
                handicap: null,
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
        console.log(this.props.users)
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


    /* close = () => {
         this.setState({ open: false, loadingView: false, loading: false });
     }*/

    handleNameChange = (event) => {
        this.setState({ fullName: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleHandicapChange = (event) => {
        this.setState({ handicap: event.target.value });
    }

    handlePWChange = (event) => {
        this.setState({ password: event.target.value });
    }

 

    handleCheckboxChange = (event, value) => {
        console.log(value.checked);
        this.setState({ isadmin: value.checked })
    }

    /*  handleChange = e => {
          e.preventDefault();
          const { name, value } = e.target;
          let formErrors = { ...this.state.formErrors };
      
          switch (name) {
            case "firstName":
              formErrors.firstName =
                value.length < 3 ? "minimum 3 characaters required" : "";
              break;
            case "lastName":
              formErrors.lastName =
                value.length < 3 ? "minimum 3 characaters required" : "";
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
      
          this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };*/


    handleSubmit = (event) => {
        event.preventDefault();
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
                let user = {id: response.data.id, full_name: this.state.fullName, email: this.state.email, handicap: parseFloat(this.state.handicap), is_admin: this.state.isadmin}
                this.props.addNewUser(user)
                this.setState({ loading: false }, () => this.props.closeModal());
            }).catch(error => {
                console.log(error);
            });
        }
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.cancel();
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

                                name='fullName'
                                control={Input}
                                label='Name'
                                placeholder='Name'
                                value={this.state.fullName} onChange={this.handleNameChange}
                            />
                            <Form.Field

                                name='email'
                                control={Input}
                                label='Email'
                                placeholder='Email'
                                value={this.state.email} onChange={this.handleEmailChange}
                            />
                            <Form.Field

                                name='handicap'
                                control={Input}
                                label='Handicap'
                                placeholder='Hcp'
                                width={6}
                                value={this.state.handicap} onChange={this.handleHandicapChange}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field

                                name='password'
                                control={Input}
                                label='Password'
                                placeholder='Password'
                                value={this.state.password} onChange={this.handlePWChange}
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