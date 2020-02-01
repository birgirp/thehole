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
                { headerName: "Out", field: "sumf9", width: 40, cellStyle: { fontWeight: 'bold', borderLeft:"3px" },  headerComponentParams: {fontWeight: 'bold' }},
                { headerName: "10", field: "h10", width: 40, cellStyle: this.cellStyling, },
                { headerName: "11", field: "h11", width: 40, cellStyle: this.cellStyling, },
                { headerName: "12", field: "h12", width: 40, cellStyle: this.cellStyling, },
                { headerName: "13", field: "h13", width: 40, cellStyle: this.cellStyling, },
                { headerName: "14", field: "h14", width: 40, cellStyle: this.cellStyling, },
                { headerName: "15", field: "h15", width: 40, cellStyle: this.cellStyling, },
                { headerName: "16", field: "h16", width: 40, cellStyle: this.cellStyling, },
                { headerName: "17", field: "h17", width: 40, cellStyle: this.cellStyling, },
                { headerName: "18", field: "h18", width: 40, cellStyle: this.cellStyling, },
                { headerName: "In", field: "sums9", width: 40, cellStyle: { fontWeight: 'bold' } },
                { headerName: "Total", field: "sum18", width: 40, cellStyle: { fontWeight: 'bold' } },
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



    componentDidMount() {
        this.setState({ isLoading: true })
        let courseId = this.props.scorecardData.course_id
        console.log("hi!")

        console.log(this.props.scorecardData)
        let parf9 = 0
        let pars9 = 0
        let par18  = 0
        axios.post("/api/getholes", { courseId })
            .then(res => {
                console.log(res)
                let rowData = this.state.rowData

                res.data.forEach(hole => {
                    rowData[0]["h" + hole.hole] = hole.par;
                    rowData[1]["h" + hole.hole] = hole.handicap;
                    if(hole.hole<10){parf9 +=hole.par}  
                    if(hole.hole>9){pars9 +=hole.par}  

                });

                par18 = parf9 + pars9

                var i
                for (i = 0; i < 19; i++) {
                    rowData[2]["h" + i] = this.props.scorecardData["h" + i]
                    rowData[3]["h" + i] = this.props.scorecardData["p" + i]

                }
                rowData[0]["sumf9"] = parf9
                rowData[0]["sums9"] = pars9
                rowData[0]["sum18"] = par18

                rowData[2]["sumf9"] = this.props.scorecardData["sf9"]
                rowData[3]["sumf9"] = this.props.scorecardData["f9"]
                rowData[2]["sums9"] = this.props.scorecardData["ss9"]
                rowData[3]["sums9"] = this.props.scorecardData["s9"]

                rowData[2]["sum18"] = this.props.scorecardData["strokes"]
                rowData[3]["sum18"] = this.props.scorecardData["points"]

                this.setState({ rowData: rowData })
                this.setState({ isLoading: false })
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }




    handleClose = () => {
        this.props.closeModal();
    }


    render() {
        if (this.state.isLoading) {
            return (<Loading />)
        } else {

            return (

                <div>
                    <Grid columns='equal' >
                        <Grid.Row>
                            <Grid.Column>
                                <Label >Handicap: {this.props.scorecardData.handicap}</Label>

                            </Grid.Column>
                            <Grid.Column >
                                <Label>Course: {this.props.scorecardData.course_name}-{this.props.scorecardData.tee}</Label>
                            </Grid.Column>
                            <Grid.Column >
                                <Label>Date: {this.props.scorecardData.round_date.split('T')[0]}</Label>
                            </Grid.Column>
                            <Grid.Column >
                               
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