import React, { Component } from "react";
import { Button, Grid, Input, Dropdown, Label } from "semantic-ui-react";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { DateInput } from 'semantic-ui-calendar-react';
//import SemanticDatepicker from 'react-semantic-ui-datepickers';
//import ptLocale from 'react-semantic-ui-datepickers/dist/locales/pt-BR';
//import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class Scorecard extends Component {

    constructor(props) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        super(props);

        this.state = {
            scorecardId: "",
            courses: [],
            isLoading: false,
            createNew: false,
            noScores: false,
            scoresTouched: false,
            dateTouched: false,
            handicapTouched: false,
            courseTouched: false,
            selectedCourseId: null,
            selectedCourseName: "",
            handicap: 0,
            roundDate: today,
            status: "",
            scores: null,
            holeIds: [],
            sumStrokes: null,
            sumPoints: null,

            columnDefs: [
                { headerName: "", field: "rowname" },
                { headerName: "H1", field: "h1", width: 40 },
                { headerName: "H2", field: "h2", width: 40 },
                { headerName: "H3", field: "h3", width: 40 },
                { headerName: "H4", field: "h4", width: 40 },
                { headerName: "H5", field: "h5", width: 40 },
                { headerName: "H6", field: "h6", width: 40 },
                { headerName: "H7", field: "h7", width: 40 },
                { headerName: "H8", field: "h8", width: 40 },
                { headerName: "H9", field: "h9", width: 40 },
                { headerName: "H10", field: "h10", width: 40 },
                { headerName: "H11", field: "h11", width: 40 },
                { headerName: "H12", field: "h12", width: 40 },
                { headerName: "H13", field: "h13", width: 40 },
                { headerName: "H14", field: "h14", width: 40 },
                { headerName: "H15", field: "h15", width: 40 },
                { headerName: "H16", field: "h16", width: 40 },
                { headerName: "H17", field: "h17", width: 40 },
                { headerName: "H18", field: "h18", width: 40 },
            ],
            rowData: [
                { rowname: "Par", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Hcp", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Score", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
                { rowname: "Points", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" }
            ],
            defaultColDef: {
                resizable: false,
                editable: this.checkEditFunction
                , width: 70,
                suppressMovable: true,
                onCellValueChanged: this.onCellValueChanged
            }
        }
    }

    onCellValueChanged = (e) => {

        this.setState({ scoresTouched: true })

        let rowData = this.state.rowData;
        let par = rowData[0][e.column.colId]
        let hcp = rowData[1][e.column.colId]
        let handicap = this.state.handicap
        let score = e.newValue
        let points = this.calculatePointsPerHole(parseInt(par), parseInt(hcp), parseInt(score), parseInt(handicap))
        rowData[3][e.column.colId] = points;

        this.setState({ rowData: rowData })
        this.sumScores()
        e.api.refreshCells()
    }

    sumScores = () => {
        let sumStrokes = 0
        let sumPoints = 0
        let rowData = this.state.rowData;
        var i
        for (i = 1; i < 19; i++) {
            sumStrokes = sumStrokes + parseInt(rowData[2]["h" + i])
            sumPoints = sumPoints + parseInt(rowData[3]["h" + i])
        }
        this.setState({ sumStrokes: sumStrokes, sumPoints: sumPoints })
    }

    checkEditFunction = (params) => {

        //params.node - for row identity
        //params.column - for column identity
        return params.column.colId !== "rowname" && params.node.rowIndex === 2
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        var firstline = null
        axios.post("/api/getscorecard", { tourId: this.props.tourId, roundNum: this.props.roundNum, playerId: this.props.playerId })
            .then(res => {
                if (!res.data) {
                    this.setState({ createNew: true })
                    throw new Error('No scorecard found');
                }
                firstline = res.data[0]

                let date = firstline.round_date.split("T")[0]
                console.log(firstline.course_id)
                this.setState({ scorecardId: firstline.id, status: firstline.status, selectedCourseId: firstline.course_id, roundDate: date, handicap: firstline.handicap });
                let holeIds = [];
                let rowData = this.state.rowData;
                res.data.forEach(hole => {
                    rowData[2]["h" + hole.hole] = hole.strokes;
                    rowData[3]["h" + hole.hole] = hole.points;
                    holeIds.push(hole.id)
                });

                this.setState({ rowData, holeIds: holeIds, isLoading: false });
                this.fetchCourse(firstline.course_id);


            })

            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
    }

    handleCancel = () => {
        this.props.closeModal();
    }


    handleSave = () => {
        let holeIds = this.state.holeIds;
        let rowData = this.state.rowData;
        let scores = [];
        let scorecardId = this.state.scorecardId;

        this.setState({ isLoading: true })
        var i;
        for (i = 1; i < 19; i++) {
            let holeId = holeIds[i - 1]
            let score = rowData[2]["h" + i]
            let points = rowData[3]["h" + i]
            if(this.state.createNew){
                scores.push([holeId, score, points])
            }else {
                scores.push([scorecardId, holeId, score, points])
            }


        }
        if (this.state.createNew) {
            axios.post("/api/addscorecard", {
                tourId: this.props.tourId, roundNum: this.props.roundNum,
                playerId: this.props.playerId, courseId: this.state.selectedCourseId, roundDate: this.state.roundDate,
                handicap: this.state.handicap, status: "Saved", scores: scores
            }).then(res => {
                this.setState({ isLoading: false })
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
        } else {
         
            axios.post("/api/updatescorecard", {
                scorecardId: scorecardId, courseId: this.state.selectedCourseId, roundDate: this.state.roundDate,
                handicap: this.state.handicap, status: "Saved", scores: scores
            }).then((res => {
                this.setState({ isLoading: false })
            })).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
        }
    }



    handleHandicapChange = (e, v) => {
        this.setState({ handicap: v.value }, () => this.calculateAllPoints());
    }

    calculateAllPoints = () => {
        let rowData = this.state.rowData;
        let handicap = this.state.handicap
        var i;
        for (i = 1; i < 19; i++) {
            let par = rowData[0]["h" + i]
            let hcp = rowData[1]["h" + i]
            let score = rowData[2]["h" + i]
            let points = this.calculatePointsPerHole(par, hcp, score, handicap)
            rowData[3]["h" + i] = points;

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

    fetchCourse = (courseId) => {
        this.setState({ isLoading: true })

        axios.post("/api/getholes", { courseId })
            .then(res => {
                let holeIds = [];
                let rowData = this.state.rowData
                res.data.forEach(hole => {
                    rowData[0]["h" + hole.hole] = hole.par;
                    rowData[1]["h" + hole.hole] = hole.handicap;
                    holeIds.push(hole.id)
                });

                this.setState({ rowData: rowData, holeIds: holeIds }, () => this.calculateAllPoints())

                this.setState({ isLoading: false })
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }


    handleCourseChange = (e, v) => {
        this.setState({ selectedCourseId: parseInt(v.value) });

        this.fetchCourse(v.value);



    }

    onDateChange = (event, { name, value }) => {

        console.log(this.state.roundDate)
        console.log(JSON.stringify(this.state.roundDate))

        this.setState({ roundDate: value })
        console.log(value)

    }



    render() {

        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            let courses = this.props.courses
            let cselection = courses.map((val, index, arr) => {
                return { key: parseInt(val.course_id), text: val.course_name + "-" + val.tee, value: parseInt(val.course_id) }
            });

            return (
                <div>
                    <Grid colums={3} >
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Input
                                    name='Handicap'
                                    label='Handicap'
                                    placeholder='Handicap'
                                    max="54"
                                    min="0"
                                    type="Number"
                                    value={this.state.handicap}
                                    onChange={this.handleHandicapChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={6}>


                                <Dropdown
                                    fluid
                                    selection
                                    label='Courses'
                                    value={this.state.selectedCourseId}
                                    placeholder='Select course'
                                    options={cselection}
                                    onChange={this.handleCourseChange}
                                />
                            </Grid.Column>
                            <Grid.Column>

                                <DateInput
                                    name="date"
                                    placeholder="Date"
                                    value={this.state.roundDate}
                                    iconPosition="left"
                                    dateFormat="YYYY-MM-DD"
                                    onChange={this.onDateChange}
                                />
                            </Grid.Column>
                        </Grid.Row>


                    </Grid>
                    <br />
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        enterMovesDownAfterEdit={false}
                        enterMovesDown={false}>
                    </AgGridReact>
                    <br />

                    <Grid colums={3} >
                        <Grid.Row>
                            <Grid.Column  >
                                <Button primary onClick={this.handleSave}>Save</Button>
                            </Grid.Column>
                            <Grid.Column  >
                                <Button secondary onClick={this.handleCancel}>Cancel</Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5} >
                                <Label>Strokes: {this.state.sumStrokes}</Label>
                                <Label>Points: {this.state.sumPoints}</Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        }
    }
}

export default Scorecard;