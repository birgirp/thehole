import React, { Component } from "react";

class Home extends Component {
    render() {
        console.log(this.props)
        console.log(this.props.location.state.detail);
        console.log(this.props.location.state.type);
        return (
            <div>
                <h1>Home...</h1>
            </div>
        )
    }
}

export default Home;