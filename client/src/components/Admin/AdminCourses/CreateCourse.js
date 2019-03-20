// External libs
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
//import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// Own components...
//import Loading from "../../Loading/Loading";

class CreatCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                { headerName: "", field: "rowname" },
                { headerName: "Make", field: "make" },
                { headerName: "Model", field: "model" },
                { headerName: "Price", field: "price" }
            ],
            rowData: [
                { rowname: "Par", make: "Toyota", model: "Celica", price: 35000 },
                { rowname: "Hcp", make: "Ford", model: "Mondeo", price: 32000 },
                { rowname: "Score", make: "Porsche", model: "Boxter", price: 72000 },
                { rowname: "points", make: "Porsche", model: "Boxter", price: 72000 }
            ],
            defaultColDef: {
                resizable: true,
                editable: this.checkEditFunction
            }

        };
    }

    checkEditFunction = (params) => {

        //params.node - for row identity
        //params.column - for column identity
        console.log(params.column);
        return params.node.id > 1 && params.column.colId !== "rowname" // - just as sample
    }

    handleSubmit = () => {
        console.log(this.state.rowData)
    }


    render() {


        return (
            <div>
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '400px',
                        width: '800px'
                    }}
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
                <Button primary onClick={this.handleSubmit}>Submit</Button>

            </div>
        )
    }
}


export default CreatCourse;