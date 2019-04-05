import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
//import axios from "axios";
import Loading from "../../Loading/Loading";
import Scorecard from "./Scorecard";

class TourRound extends Component {


    constructor(props) {
        super(props);
        this.state = {

            players: [],
            courses: [],
            isLoading: false,
            isOpenScorecard: false
        }
    }

    componentDidMount() {

    }
    closeScorecard = () => {

        this.setState({isOpenScorecard: false})
    }

    handleSubmit = () =>{
        this.setState({isOpenScorecard: true})
    }



    render() {

        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (
                <div>
                    <h1>{this.props.roundNum} - {this.props.playerId} -  {this.props.tourId} </h1>
                    <br />
                    <Button primary onClick={this.handleSubmit}>Open Scorecard</Button>
                    <br />


                    <Modal size="fullscreen" open={this.state.isOpenScorecard} onClose={this.closeScorecard} 
                    closeOnDimmerClick={false}>
                        <Modal.Header>Scorecard </Modal.Header>
                        <Modal.Content >
                            {<Scorecard closeModal={this.closeScorecard} roundNum={this.props.roundNum} playerId={this.props.playerId} tourId={this.props.tourId} courses={this.props.courses}/>}
                        </Modal.Content>
                    </Modal>


                </div>


            )
        }
    }
}

export default TourRound;