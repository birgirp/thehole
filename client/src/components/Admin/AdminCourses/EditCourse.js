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
                { rowname: "Hcp", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" }
            ],
            defaultColDef: {
                resizable: false,
                editable: this.checkEditFunction
                , width: 70,
                suppressMovable: true
            }
        };
    }

    componentDidMount() {
        axios.post("/api/getholes", {
            courseId: this.state.courseId
        }).then(response => {
            console.log(response.data);
            if (response.data.length === 0) {
                console.log("no holes for course");
            }
            this.setState({ loading: false })
        })
            .catch(error => {
                console.log(error);
            });
    }

    checkEditFunction = (params) => {

        //params.node - for row identity
        //params.column - for column identity
        console.log(params.column);
        return params.column.colId !== "rowname" // - just as sample
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        axios.post("/api/addholes", {
            courseId: this.state.courseId,
            rowData: this.state.rowData
        }).then(response => {
                console.log(response);
                this.setState({ loading: false })
                this.props.closeModal();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCancel = () => {
        this.props.closeModal();
        //window.location = '/admin/courses'
    }

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