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
            password1: "",
            password2: "",
            loading: false,

            formErrors: {
                fullName: "",
                email: "",
                handicap: null,
                password1: "",
                password2: ""
            }
        };
    }


    componentDidMount() {
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


    handleSubmit = () => {
        this.setState({ loading: true });
        if (this.state.editingUser) {
            axios.post("/users/edituser", {
                userId: this.props.userId,
                fullName: this.state.fullName,
                email: this.state.email,
                handicap: parseFloat(this.state.handicap),
                isadmin: this.state.isadmin,
                password: this.state.password1
            }).then(response => {
                console.log(response);
                this.props.reloadUsers();
                this.props.closeModal();
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
            });

        } else {
            axios.post("/users/createUser", {
                fullName: this.state.fullName,
                email: this.state.email,
                handicap: parseFloat(this.state.handicap),
                isadmin: this.state.isadmin,
                password: this.state.password1
            }).then(response => {
                console.log(response);
                this.props.reloadUsers();
                this.props.closeModal();
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
            });
        }
        //   this.setState({ fullName: "", email: "", handicap: "", isadmin: false, password1: "", password2: "" });


    }

    handleCancel = () => {
        this.props.closeModal();
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

                                name='password1'
                                control={Input}
                                label='Password 1'
                                placeholder='Password 1'
                                type="password"
                                value={this.state.password1} onChange={this.handlePW1Change}
                            />
                            <Form.Field

                                name='password2'
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