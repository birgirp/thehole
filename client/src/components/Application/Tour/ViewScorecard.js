import React, { Component } from "react";
import { Button, Grid, Label } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import Loading from "../../Loading/Loading";

//import SemanticDatepicker from 'react-semantic-ui-datepickers';
//import ptLocale from 'react-semantic-ui-datepickers/dist/locales/pt-BR';
//import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "./scorecard.css";


class Scorecard extends Component {

    constructor(props) {

        super(props);
        this.state = {
            scorecardId: "",
            isLoading: false,

            selectedCourseId: null,
            selectedCourseName: "",
            handicap: 0,
            roundDate: "",
            status: "Saved",
            scores: null,
            holeIds: [],
            sumStrokes: 0,
            sumPoints: 0,

            columnDefs: [
                { headerName: "", field: "rowname" },
                { headerName: "1", field: "h1", width: 40, cellStyle: this.cellStyling, },
                { headerName: "2", field: "h2", width: 40, cellStyle: this.cellStyling, },
                { headerName: "3", field: "h3", width: 40, cellStyle: this.cellStyling, },
                { headerName: "4", field: "h4", width: 40, cellStyle: this.cellStyling, },
                { headerName: "5", field: "h5", width: 40, cellStyle: this.cellStyling, },
                { headerName: "6", field: "h6", width: 40, cellStyle: this.cellStyling, },
                { headerName: "7", field: "h7", width: 40, cellStyle: this.cellStyling, },
                { headerName: "8", field: "h8", width: 40, cellStyle: this.cellStyling, },
                { headerName: "9", field: "h9", width: 40, cellStyle: this.cellStyling, },
                { headerName: "10", field: "h10", width: 40, cellStyle: this.cellStyling, },
                { headerName: "11", field: "h11", width: 40, cellStyle: this.cellStyling, },
                { headerName: "12", field: "h12", width: 40, cellStyle: this.cellStyling, },
                { headerName: "13", field: "h13", width: 40, cellStyle: this.cellStyling, },
                { headerName: "14", field: "h14", width: 40, cellStyle: this.cellStyling, },
                { headerName: "15", field: "h15", width: 40, cellStyle: this.cellStyling, },
                { headerName: "16", field: "h16", width: 40, cellStyle: this.cellStyling, },
                { headerName: "17", field: "h17", width: 40, cellStyle: this.cellStyling, },
                { headerName: "18", field: "h18", width: 40, cellStyle: this.cellStyling, },
            ],
            rowData: [
                { rowname: "Par", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Hcp", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Score", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Points", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" }
            ],
            defaultColDef: {
                resizable: false,
                editable: false
                , width: 70,
                suppressMovable: true,
                onCellValueChanged: this.onCellValueChanged
            },

        }
    }




    cellStyling = (params) => {
        // let background = { background: 'white', textAlign: 'center' }
        let background = { background: 'white' }
        let rowData = this.state.rowData
        let hole = params.colDef.field
        let rowName = params.node.data.rowname
        let par = rowData[0][hole]
        let score = params.value
        if (rowName === 'Score' && score) {
            background = { background: '#ffffcc' }
            let delta = (score - par)
            if (delta > 2) { background = { background: '#ff3333' } }
            if (delta === 1) { background = { background: '#ffb3b3' } }
            if (delta === 0) { background = { background: '#99ddff' } }
            if (delta === -1) { background = { background: '#b3ffb3' } }
            if (delta === -2) { background = { background: '#66ff66' } }
        }
        return background;
    }



    onGridReady = (params) => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        //  this.gridApi.sizeColumnsToFit();
    }

    sumScores = () => {
        let sumStrokes = 0
        let sumPoints = 0
        let rowData = this.state.rowData;
        var i
        for (i = 1; i < 19; i++) {
            if (rowData[2]["h" + i] !== "") {
                sumStrokes = sumStrokes + parseInt(rowData[2]["h" + i])
                sumPoints = sumPoints + parseInt(rowData[3]["h" + i])
            }
        }
        this.setState({ sumStrokes: sumStrokes, sumPoints: sumPoints })
    }


    componentDidMount() {
        this.setState({ isLoading: true })
        let courseId = this.props.scorecardData.course_id
        axios.post("/api/getholes", { courseId })
            .then(res => {
                let rowData = this.state.rowData
                res.data.forEach(hole => {
                    rowData[0]["h" + hole.hole] = hole.par;
                    rowData[1]["h" + hole.hole] = hole.handicap;

                });
                var i
                for (i = 0; i < 19; i++) {
                    rowData[2]["h" + i] = this.props.scorecardData["h" + i]

                }
                this.setState({ rowData: rowData }, this.calculateAllPoints())
                this.setState({ isLoading: false })
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }




    handleClose = () => {
        this.props.closeModal();
    }

    calculateAllPoints = () => {
        let rowData = this.state.rowData;
        let handicap = this.props.scorecardData.handicap
        var i;
        for (i = 1; i < 19; i++) {
            let par = rowData[0]["h" + i]
            let hcp = rowData[1]["h" + i]
            let score = rowData[2]["h" + i]
            if (score) {
                let points = this.calculatePointsPerHole(par, hcp, score, handicap)
                rowData[3]["h" + i] = points;
            }

        }

        this.setState({ rowData: rowData }, () => this.sumScores())
    }

    calculatePointsPerHole = (par, hcp, score, handicap) => {
        let pph = this.pointPerHole(handicap, hcp)
        let input = score - pph - par
        let points = this.staplefordPoints(input)
        return points
    }

    pointPerHole = (handicap, holehcp) => {
        let extrapoints = 0
        if (handicap >= holehcp) { extrapoints++ }
        if (holehcp + 18 <= handicap) { extrapoints++ }
        if (holehcp + 36 <= handicap) { extrapoints++ }
        return extrapoints
    }

    staplefordPoints = (strokes) => {


        let points = 0
        switch (strokes) {
            case -3:
                points = 5
                break;
            case -2:
                points = 4
                break;
            case -1:
                points = 3
                break;
            case 0:
                points = 2
                break;
            case 1:
                points = 1
                break;
            case 2:
                points = 0
                break;
            default:
                points = 0
        }
        return points

    }




    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (

                <div>
                    <Grid colums={3} >
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Label>Handicap: {this.props.scorecardData.handicap}</Label>

                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Label>Course: {this.props.scorecardData.course_name}-{this.props.scorecardData.tee}</Label>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Label>Date: {this.props.scorecardData.round_date.split("T")[0]}</Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                    >
                    </AgGridReact>
                    <br />
                    <Grid>
                        <Grid.Column floated='right'>
                            <Grid.Row>
                                <Label floated='right'>Strokes: {this.props.scorecardData.strokes}</Label>
                                <Label floated='right'>Points:  {this.props.scorecardData.points}</Label>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                    <Grid colums={1} >
                        <Grid.Row>
                            <Grid.Column>
                                <Button secondary onClick={this.handleClose}>Close</Button>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </div>
            )
        }
    }
}

export default Scorecard;