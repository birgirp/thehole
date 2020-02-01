import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import Loading from "../../Loading/Loading";
import Scorecard from "./Scorecard";
import ViewScorecard from "./ViewScorecard";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "./TourRoundModal.css";

class TourRound extends Component {


    constructor(props) {
        super(props);
        this.state = {
            players: [],
            courses: [],
            isLoading: false,
            isOpenScorecard: false,
            isOpenViewScorecard: false,
            scoreCardPlayer:"",
            selectedRound: null,
            scorecardData:null,
            columnDefs: [
                { headerName: "Player", field: "full_name", width: 100, pinned: "left" },
                { headerName: "Course", field: "course_name",width: 130, },
                { headerName: "Hcp", field: "handicap", width: 40 },
                { headerName: "In", field: "f9", width: 40 },
                { headerName: "Out", field: "s9", width: 40 },
                { headerName: "Total", field: "points", width: 50,  sort: "desc" },
 /*
                { headerName: "Sum", field: "strokes", width: 60 },
                { headerName: "Points", field: "points", width: 60,  sort: "desc" },
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
                { headerName: "18", field: "h18", width: 30 },*/
              
            ],
            rowData: [],
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            overlayNoRowsTemplate: "<span> </span>",
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
            this.setState({ selectedRound: this.props.roundNum })
        }
    }


    componentDidMount() {
        this.setState({ selectedRound: this.props.roundNum });
        this.fetchScorecards();
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        params.api.sizeColumnsToFit()
    }

    fetchScorecards = () => {
        if (!this.state.isLoading) {
            this.setState({ isLoading: true })
        }
        axios.post("/api/getroundscorecards", { tourId: this.props.tourId, round: this.props.roundNum })
            .then(res => {
                if (!res.data) {
                    let rowData = [];
                    this.setState({ rowData: rowData,  isLoading: false  })
                   
                }else{
                  
                this.setState({ rowData: res.data })
                if (this.state.isLoading) {

                    this.setState({ isLoading: false })
                }}
            }).catch(err => {
                console.log(err);
                if (this.state.isLoading) {
                    this.setState({ isLoading: false })
                }
            })
    }



    closeScorecard = () => {
        this.setState({ isOpenScorecard: false })
    }

    closeViewScorecard = () => {
        this.setState({ isOpenViewScorecard: false })
    }


    handleSubmit = () => {
        this.setState({ isOpenScorecard: true })
    }

    handleCellClicked = (e) =>{
        //console.log(e.data)
        
        this.setState({ scoreCardPlayer:e.data.full_name, scorecardData: e.data, isOpenViewScorecard: true })
      
    }

    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <div>
                    <Button primary onClick={this.handleSubmit}>Open Scorecard</Button>
                    <br />
                    <h2>Scorecards</h2>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        enterMovesDownAfterEdit={false}
                        enterMovesDown={false}
                        overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                        overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                        onCellDoubleClicked={this.handleCellClicked}>
                        
                        
                    </AgGridReact >
                    <br />
                    <Modal id="tourRoundModal" size="fullscreen" open={this.state.isOpenScorecard} onClose={this.closeScorecard}
                        closeOnDimmerClick={false}>
                        <Modal.Header>Scorecard - round {this.props.roundNum}</Modal.Header>
                        <Modal.Content >
                            {<Scorecard handicap={this.props.handicap} fetchScorecards={this.fetchScorecards} closeModal={this.closeScorecard} roundNum={this.props.roundNum} playerId={this.props.playerId} tourId={this.props.tourId} courses={this.props.courses} />}
                        </Modal.Content>
                    </Modal>
                    <Modal id="tourRoundModal" size="fullscreen" open={this.state.isOpenViewScorecard} onClose={this.closeViewScorecard}
                        closeOnDimmerClick={false}>
                        <Modal.Header>{this.state.scoreCardPlayer}: Round {this.props.roundNum}</Modal.Header>
                        <Modal.Content >
                            {<ViewScorecard scorecardData={this.state.scorecardData} closeModal={this.closeViewScorecard}/>}
                        </Modal.Content>
                    </Modal>
                </div>
            )
        }
    }
}

export default TourRound;