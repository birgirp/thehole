import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading";
import Scorecard from "./Scorecard";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class TourRound extends Component {


    constructor(props) {
        super(props);
        this.state = {

            players: [],
            courses: [],
            isLoading: false,
            isOpenScorecard: false,
            selectedRound: null,

            columnDefs: [
                { headerName: "Player", field: "full_name", width: 70 },
                { headerName: "Course", field: "course_name", width: 140 },
                { headerName: "Hcp", field: "handicap", width: 40 },
                { headerName: "1", field: "h1", width: 30 },
                { headerName: "2", field: "h2", width: 30 },
                { headerName: "3", field: "h3", width: 30 },
                { headerName: "4", field: "h4", width: 30 },
                { headerName: "5", field: "h5", width: 30 },
                { headerName: "6", field: "h6", width: 30 },
                { headerName: "7", field: "h7", width: 30 },
                { headerName: "8", field: "h8", width: 30 },
                { headerName: "9", field: "h9", width: 30 },
                { headerName: "10", field: "h10", width: 30 },
                { headerName: "11", field: "h11", width: 30 },
                { headerName: "12", field: "h12", width: 30 },
                { headerName: "13", field: "h13", width: 30 },
                { headerName: "14", field: "h14", width: 30 },
                { headerName: "15", field: "h15", width: 30 },
                { headerName: "16", field: "h16", width: 30 },
                { headerName: "17", field: "h17", width: 30 },
                { headerName: "18", field: "h18", width: 30 },
                { headerName: "Sum", field: "strokes", width: 60 },
                { headerName: "Points", field: "points", width: 60 }
            ],
            rowData: [],
            defaultColDef: {
                resizable: false,
                editable: false
                , width: 70,
                suppressMovable: true
            }
        }
    }

    componentDidUpdate = () => {
        if (this.props.roundNum !== this.state.selectedRound) {
            this.fetchScorecards();
            this.setState({selectedRound: this.props.roundNum})
        }
    }


    componentDidMount() {
        this.setState({selectedRound: this.props.roundNum});
        this.fetchScorecards();

    }


    fetchScorecards = () => {
      
        if(!this.state.isLoading){
            this.setState({ isLoading: true })
        }
     
        axios.post("/api/getroundscorecards", { tourId: this.props.tourId, round: this.props.roundNum })
            .then(res => {
                if (!res.data) {
                    throw new Error('No data found');
                }
                this.setState({ rowData: res.data })
                if(this.state.isLoading){
                    this.setState({ isLoading: false })
                }
            }).catch(err => {
                console.log(err);
                if(this.state.isLoading){
                    this.setState({ isLoading: false })
                }
            })
    }



    closeScorecard = () => {
        this.setState({ isOpenScorecard: false })
    }

    handleSubmit = () => {
        this.setState({ isOpenScorecard: true })
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
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        enterMovesDownAfterEdit={false}
                        enterMovesDown={false}>
                    </AgGridReact>

                    <br />
                    <Modal size="fullscreen" open={this.state.isOpenScorecard} onClose={this.closeScorecard}
                        closeOnDimmerClick={false}>
                        <Modal.Header>Scorecard - round {this.props.roundNum}</Modal.Header>
                        <Modal.Content >
                            {<Scorecard closeModal={this.closeScorecard} roundNum={this.props.roundNum} playerId={this.props.playerId} tourId={this.props.tourId} courses={this.props.courses} />}
                        </Modal.Content>
                    </Modal>


                </div>


            )
        }
    }
}

export default TourRound;