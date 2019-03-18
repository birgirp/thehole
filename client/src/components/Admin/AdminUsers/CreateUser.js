// External libs
import React, { Component } from "react";
import { Button, Form,  Input,  Checkbox } from "semantic-ui-react";
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
            loading: false,
            isloggedin: "tbd"
        };
    }

  
    componentDidMount() {
       axios.get("/api/isloggedin")
          .then(res => {
            let isLoggedIn = res.data.loggedIn;
            
            this.setState({ isloggedin: res.data.loggedIn ? "yes": "no"})
          })
          .catch(err => {
            console.log(err);
         })
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
        console.log("ddfdf  " + this.state.isadmin)
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
        window.location = "/admin/users";
    }

    render() {
        if(this.state.isloggedin === "tbd" || this.state.isloggedin === "no"  ) {
            return (<div></div>);
        }
        else if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>
                    <h1>Create new user</h1>
                    <br />
                    <Form>
                        <h3>Name</h3>
                        <Input value={this.state.full_name} onChange={this.handleNameChange} placeholder="Name" style={{ width: "100%" }} />
                        <br />
                        <h3>Email</h3>
                        <Input value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" style={{ width: "100%" }} />
                        <br />
                        <h3>Handicap</h3>
                        <Input value={this.state.handicap} onChange={this.handleHandicapChange} placeholder="Handicap" style={{ width: "50%" }} />
                        <br />
                        <h3>Password</h3>
                        <Input value={this.state.password1} onChange={this.handlePW1Change} placeholder="Password 1" style={{ width: "100%" }} />
                        <br />
                        <h3>Repeat Password</h3>
                        <Input value={this.state.password2} onChange={this.handlePW2Change} placeholder="Password 2" style={{ width: "100%" }} />
                        <br />
                        <h3>Is Administrator</h3>
                        <Checkbox  type="checkbox" checked={this.state.isadmin} onChange={this.handleCheckboxChange} />
                        <br /><br />
                        <br /><br />
                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                        <Button secondary onClick={this.handleCancel}>Cancel</Button>
                    </Form>
                </div>
            )
        }
    }
}


export default CreateUser;