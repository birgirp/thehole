// External libs
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// Own components...
import Loading from "../../Loading/Loading";

class EditCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: "",
            ids: [],
            loading: false,
            country: "",
            courseName: "",
            tee: "",
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
            ],
            defaultColDef: {
                resizable: false,
                editable: this.checkEditFunction,
                width: 70,
                suppressMovable: true,
            }
        };
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.post("/api/getholes", {
            courseId: this.props.courseId

        }).then(response => {
            if (response.data.length === 0) {
                console.log("no holes for course");
                this.setState({ loading: false })
            } else {
                let rowData = this.state.rowData
                let ids = this.state.ids
                response.data.forEach(hole => {
                    rowData[0]["h" + hole.hole] = hole.par;
                    rowData[1]["h" + hole.hole] = hole.handicap;
                    ids.push(hole.id)
                });

                this.setState({ rowData, ids })
                this.setState({ loading: false })
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    checkEditFunction = (params) => {

        //params.node - for row identity
        //params.column - for column identity

        return params.column.colId !== "rowname" // - just as sample
    }

    handleSubmit = () => {
        if (this.validateSubmit) {
         
            this.setState({ loading: true });
            let rowData = this.state.rowData;
            let ids = this.state.ids;
            let holes = []
            for (var i = 1; i < 19; i++) {
                let par = rowData[0]["h" + i]
                let hcp = rowData[1]["h" + i]
                let id = ids[i - 1]
                holes.push({ "id": id, "par": par, "handicap": hcp })
            }



            axios.post("/api/editholes", {
                holes: holes
            }).then(response => {
                console.log(response);
                this.setState({ loading: false })
                this.props.closeModal();
            })
                .catch(error => {
                    console.log(error);
                    this.props.closeModal();
                });
        }
    }

    validateSubmit = () => {
        let ok = true;
        let rowData = this.state.rowData;
        let sumHcp = 0;
        for (var i = 1; i < 19; i++) {
            let par = rowData[0]["h" + i]
            let hcp = rowData[1]["h" + i]
            if (!par || !hcp) {
                ok = false
            } else {
                sumHcp += hcp
            }
        }
        if (ok) {
            if (sumHcp !== 171) {
                console.log("sum of hcp values !== 171")
                ok = false
            }
        }
        return ok

    }

    handleCancel = () => { this.props.closeModal(); }

    render() {

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {

            //<div className="ag-theme-balham" style={{ height: '200px', width: '1200px'  }}>
            return (
                <div>
                    <h1>Edit holes </h1>
                    <br />

                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                    <br />

                    <Button primary onClick={this.handleSubmit}>Submit</Button>
                    <Button secondary onClick={this.handleCancel}>Cancel</Button>

                </div>
            )
        }
    }
}

export default EditCourse;