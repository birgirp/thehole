import React, { Component } from "react";
import { Button, Grid, Input, Dropdown, Label } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
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
            status: "Saved",
            scores: null,
            holeIds: [],
            sumStrokes: 0,
            sumPoints: 0,
            isMissingCourse: false,
            isIncomplete: false,
            submitting: false,
            columnDefs: [
                { headerName: "", field: "rowname" },
                { headerName: "1", field: "h1", width: 40 },
                { headerName: "2", field: "h2", width: 40 },
                { headerName: "3", field: "h3", width: 40 },
                { headerName: "4", field: "h4", width: 40 },
                { headerName: "5", field: "h5", width: 40 },
                { headerName: "6", field: "h6", width: 40 },
                { headerName: "7", field: "h7", width: 40 },
                { headerName: "8", field: "h8", width: 40 },
                { headerName: "9", field: "h9", width: 40 },
                { headerName: "10", field: "h10", width: 40 },
                { headerName: "11", field: "h11", width: 40 },
                { headerName: "12", field: "h12", width: 40 },
                { headerName: "13", field: "h13", width: 40 },
                { headerName: "14", field: "h14", width: 40 },
                { headerName: "15", field: "h15", width: 40 },
                { headerName: "16", field: "h16", width: 40 },
                { headerName: "17", field: "h17", width: 40 },
                { headerName: "18", field: "h18", width: 40 },
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
        let isSubmitted = this.state.status === 'Submitted' ? true : false
        let rowData = this.state.rowData;
        if (!Number.isInteger(parseInt(e.newValue)) || isSubmitted) {
            rowData[2][e.column.colId] = e.oldValue;
            this.setState({ rowData: rowData })
        } else {
            this.setState({ scoresTouched: true })
            let par = rowData[0][e.column.colId]
            let hcp = rowData[1][e.column.colId]
            let handicap = this.state.handicap
            let score = e.newValue
            let points = this.calculatePointsPerHole(parseInt(par), parseInt(hcp), parseInt(score), parseInt(handicap))
            rowData[3][e.column.colId] = points;

            this.setState({ rowData: rowData }, () => this.sumScores())
        }
        e.api.refreshCells()
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
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })
    }

    handleCancel = () => {
        this.props.closeModal();
    }

    handleSubmit = () => {
        let status = this.state.status;
        if (status === 'Submitted') {
            this.setState({ status: "Saved" })
        } else {
            let rowData = this.state.rowData
            let incomplete = false
            for (var i = 0; i < 18; i++) {
                let score = rowData[2]["h" + i]
                if (score === 0 || score === "") {
                    incomplete = true
                }
            }
            if (incomplete) {
                this.setState({ isIncomplete: true })
                console.log(incomplete)
            } else {
                this.setState({ status: "Submitted", submitting: true }, () => this.handleSave(true))
            }
        }
    }


    handleSave = () => {
        let submitting = this.state.submitting
        if ((submitting && this.state.status === 'Submitted') || this.state.status === 'Saved' ) {
            if (!this.state.selectedCourseId) {
                this.setState({ isMissingCourse: true })
                return;
            }
            let holeIds = this.state.holeIds;
            let rowData = this.state.rowData;
            let scores = [];
            let scorecardId = this.state.scorecardId;
            this.setState({ isLoading: true })
            var i;
            let score = 0
            let points = 0
            for (i = 1; i < 19; i++) {
                let holeId = holeIds[i - 1]
                if (rowData[2]["h" + i] !== "") {
                    score = rowData[2]["h" + i]
                    points = rowData[3]["h" + i]
                } else {
                    score = 0
                    points = 0
                }
                if (this.state.createNew) {
                    scores.push([holeId, score, points])
                } else {
                    scores.push({ scorecard_id: scorecardId, hole_id: holeId, strokes: parseInt(score), points: parseInt(points) })
                }
            }
            if (this.state.createNew) {
                axios.post("/api/addscorecard", {
                    tourId: this.props.tourId, roundNum: this.props.roundNum,
                    playerId: this.props.playerId, courseId: this.state.selectedCourseId, roundDate: this.state.roundDate,
                    handicap: this.state.handicap, status: this.state.status, scores: scores
                }).then(res => {
                    this.setState({ isLoading: false })
                    this.props.fetchScorecards()
                    this.props.closeModal();
                }).catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false })
                })
            } else {

                axios.post("/api/updatescorecard", {
                    scorecardId: scorecardId, courseId: this.state.selectedCourseId, roundDate: this.state.roundDate,
                    handicap: this.state.handicap, status: this.state.status, scores: scores
                }).then((res => {
                    this.setState({ isLoading: false })
                    this.props.fetchScorecards()
                    this.props.closeModal();
                })).catch(err => {
                    console.log(err);
                    this.setState({ isLoading: false })

                })
            }
        } else {

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
            if (score !== "" && score !== 0) {
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
        this.setState({ roundDate: value })
    }



    render() {
        let isSubmitted = this.state.status === 'Submitted' ? true : false
        console.log("ddf" + isSubmitted)
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            let courses = this.props.courses
            let cselection = courses.map((val, index, arr) => {
                return { key: parseInt(val.course_id), text: val.course_name + "-" + val.tee, value: parseInt(val.course_id) }
            });

            return (
                <div>
                    <span>{this.state.status}</span>
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
                                {this.state.isMissingCourse && (<span >Select course!</span>)}
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
                               {!isSubmitted && (<Button primary onClick={this.handleSave}>Save</Button>)}

                            </Grid.Column>
                            <Grid.Column  >
                                <Button secondary onClick={this.handleCancel}>Cancel</Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={5} >
                                <Label>Strokes: {isNaN(this.state.sumStrokes) ? 0 : this.state.sumStrokes}</Label>
                                <Label>Points:  {isNaN(this.state.sumPoints) ? 0 : this.state.sumPoints}</Label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <br />
                                <Button primary onClick={this.handleSubmit}>{isSubmitted ? "UnSubmit" : "Submit"}</Button>
                                {this.state.isIncomplete && (<span >Fill in score for all holes!</span>)}

                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </div>
            )
        }
    }
}

export default Scorecard;